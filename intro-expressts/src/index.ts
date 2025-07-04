import express, { Express, Request, Response } from 'express';
import fs from 'fs';

const appServer: Express = express();
// Body Parser  : Method agar API Express kita dapat mengambil req.body
appServer.use(express.json());
const port = 5000;

appServer.get('/api', (_: Request, res: Response) => {
  res.json({
    status: 200,
    message: 'Welcome to Express.ts API',
  });
});

appServer.get('/api/products', (_: Request, res: Response) => {
  // Step-01: Read data from db.json (using fs)
  const db = fs.readFileSync('./src/db/db.json', 'utf-8');
  const dbParse = JSON.parse(db);

  // Step-02: Send data as response
  res.json({
    message: 'Get products successful',
    products: dbParse?.products,
  });
});

appServer.post('/api/products', (req: Request, res: Response) => {
  const { name, price, stocks, color } = req.body;

  // Step-02: Current data from db.json 
  const db = fs.readFileSync('./src/db/db.json', 'utf-8');
  const dbParse = JSON.parse(db);
  console.log(dbParse)
  dbParse?.products?.push({id: dbParse?.products?.length+1, name, color, price, stocks})
  console.log(dbParse)

  // Step-01: Save data from req.body to db.json
  fs.writeFileSync(
    './src/db/db.json',
    JSON.stringify(dbParse)
  );

  // Step-02: Send response
  res.json({
    message: 'Create product successful',
    product: {
      name,
      price,
      stocks,
      color,
    },
  });
});

// Update

// Delete

appServer.listen(port, () => {
  console.log(`✅ Server is running on port ${port}`);
});
