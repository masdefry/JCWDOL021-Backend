import express, { Express, Request, Response } from 'express';

const app: Express = express();
app.use(express.json());
const port = 5000;

app.get('/', (req: Request, res: Response) => {
  res.send('<h1>Welcome to Express Typescript Server</h1>');
});

import mainRouter from './routers/index.router';

app.use(mainRouter);

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
