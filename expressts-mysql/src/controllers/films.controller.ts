import { Request, Response } from 'express';
import db from '../connection';

export const findFilmsController = async (req: Request, res: Response) => {
  const { category } = req.query;

  let sqlQuery = `select title, description, release_year, name as category_name from film f
join film_category fc on fc.film_id = f.film_id
join category c on c.category_id = fc.category_id`;

  if (category) sqlQuery += ` where name = ?`;

  const films = await db.promise().query(sqlQuery, [category]);
  
  res.status(200).json({
    success: true, 
    message: category? `Successfully retrieved films in category: ${category}` : 'Successfully retrieved films', 
    data: films[0]
  })
};
