import express, { Express, Request, Response } from 'express';
import connection from './connection';

const app: Express = express();
app.use(express.json());
const port = 5000;

app.get('/', (req: Request, res: Response) => {
  res.send('<h1>Welcome to Express Typescript Server</h1>');
});

app.get('/api/products', async (req: Request, res: Response) => {
  const findProducts = await connection
    .promise()
    .query('SELECT * FROM products');

  res.status(200).json({
    message: 'Get products success',
    products: findProducts[0],
  });
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
