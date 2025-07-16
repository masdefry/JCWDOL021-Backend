import db from '../connection';
import { Request, Response } from 'express';

export const findDetailCustomerById = async (req: Request, res: Response) => {
  const { customerId } = req.params;

  const detailCustomer = await db.promise().query(
    `select concat(c.first_name, ' ', c.last_name) as customer_name, c.email, title, rental_date, return_date, concat(s.first_name, ' ', s.last_name) as staff_name from customer c
join rental r on c.customer_id = r.customer_id
join inventory i on r.inventory_id = i.inventory_id
join film f on i.film_id = f.film_id
join staff s on r.staff_id = s.staff_id
where c.customer_id = ?`,
    [customerId]
  );
  console.log('Before MAP');
  console.log(detailCustomer);
  const rentals = detailCustomer[0]?.map((rental) => {
    return {
      title: rental?.title,
      rental_date: rental?.rental_date,
      return_date: rental?.return_date,
      staff_name: rental?.staff_name,
    };
  });
  console.log('After MAP');
  console.log(rentals);
  res.status(200).json({
    success: true,
    message: 'Retrieved rental history for customer',
    data: {
        customer_name: detailCustomer[0][0]?.customer_name, 
        email: detailCustomer[0][0]?.email, 
        rentals
    }
  });
};
