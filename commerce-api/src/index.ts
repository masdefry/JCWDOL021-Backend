import express, { Express, NextFunction, Request, Response } from 'express';
import cors from 'cors';

const app: Express = express();
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(cors());
const port = 5000;

app.use((error: any, _: Request, res: Response, __: NextFunction) => {
  res.status(500).json({
    success: false,
    message: error?.isExpose ? error?.message : 'Something went wrong',
  });
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
