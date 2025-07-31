import express, { Express, NextFunction, Request, Response } from 'express';
import cors from 'cors';
import loggerWinston from './utils/logger.winston';
import morgan from 'morgan';
import { http } from 'winston';

const app: Express = express();
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(cors());
app.use(
  morgan('combined', {
    stream: {
      write: (message) => loggerWinston.http(message.trim(), http),
    },
  })
);

app.get('/api', (req: Request, res: Response) => {
  // throw new Error('this testing for log error');
  return res.status(200).json({
    success: true,
    message: 'success request',
  });
});

const port = 5000;

app.use((error: any, req: Request, res: Response, __: NextFunction) => {
  loggerWinston.error(
    `[${req?.method}] ${req?.url} - ${error?.message}`,
    error
  );
  res.status(500).json({
    success: false,
    message: error?.isExpose ? error?.message : 'Something went wrong',
  });
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
