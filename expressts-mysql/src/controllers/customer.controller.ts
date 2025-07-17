import { ResultSetHeader, RowDataPacket } from 'mysql2';
import db from '../connection';
import { Request, Response } from 'express';

export const findDetailCustomerById = async (req: Request, res: Response) => {
  const { customerId } = req.params;

  const detailCustomer = await db.promise().query<RowDataPacket[]>(
    `select concat(c.first_name, ' ', c.last_name) as customer_name, c.email, title, rental_date, return_date, concat(s.first_name, ' ', s.last_name) as staff_name from customer c
join rental r on c.customer_id = r.customer_id
join inventory i on r.inventory_id = i.inventory_id
join film f on i.film_id = f.film_id
join staff s on r.staff_id = s.staff_id
where c.customer_id = ?`,
    [customerId]
  );
  const rentals = detailCustomer[0]?.map((rental) => {
    return {
      title: rental?.title,
      rental_date: rental?.rental_date,
      return_date: rental?.return_date,
      staff_name: rental?.staff_name,
    };
  });
  res.status(200).json({
    success: true,
    message: 'Retrieved rental history for customer',
    data: {
      customer_name: detailCustomer[0][0]?.customer_name,
      email: detailCustomer[0][0]?.email,
      rentals,
    },
  });
};

export const registerCustomerController = async (
  req: Request,
  res: Response
) => {
  const { first_name, last_name, email, store_id, address } = req.body;

  const [findCity] = await db
    .promise()
    .query<RowDataPacket[]>(`SELECT * FROM city WHERE city_id = ?`, [
      address?.city_id,
    ]);

  if (findCity.length === 0)
    return res.status(404).json({
      success: false,
      message: `City with id ${address?.city_id} not found`,
    });

  const [findStore] = await db
    .promise()
    .query<RowDataPacket[]>(`SELECT * FROM store WHERE store_id = ?`, [
      store_id,
    ]);

  if (findStore.length === 0) {
    return res.status(404).json({
      success: false,
      message: `Store with id ${store_id} not found`,
    });
  }

  const point = `POINT (${address?.point1} ${address?.point2})`

  const createdAddress = await db
    .promise()
    .query<ResultSetHeader>(
      `INSERT INTO address(address, address2, district, city_id, postal_code, phone, location) VALUES (?, ?, ?, ?, ?, ?, ST_GeomFromText(?))`,
      [
        address?.address,
        address?.address2,
        address?.district,
        address?.city_id,
        address?.postal_code,
        address?.phone,
        point
      ]
    );

  const createdCustomer = await db
    .promise()
    .query<ResultSetHeader>(
      `INSERT INTO customer(store_id, first_name, last_name, email, address_id) VALUES(?, ?, ?, ?, ?)`,
      [store_id, first_name, last_name, email, createdAddress[0]?.insertId]
    );

  res.status(201).json({
    success: true,
    message: `Create new customer data successful`,
    data: { first_name, last_name, email, store_id, address },
  });
};
