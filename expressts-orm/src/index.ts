import express, { Express, NextFunction, Request, Response } from 'express';

const app: Express = express();
app.use(express.json());
const port = 5000;

app.get('/', (req: Request, res: Response) => {
  res.send('<h1>Welcome to Express Typescript Server</h1>');
});

import mainRouter from './routers/index.router';

app.use(mainRouter);

// Centralized Error (Middleware 1 Aplikasi);
app.use((error: any, req: Request, res: Response, next: NextFunction) => {
  console.log(error);
  res.status(500).json({
    success: false,
    message: error?.isExpose ? error?.message : 'Something went wrong',
  });
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
