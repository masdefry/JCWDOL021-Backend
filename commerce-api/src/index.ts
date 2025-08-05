import express, { Express, NextFunction, Request, Response } from 'express';
import cors from 'cors';
import loggerWinston from './utils/logger.winston';
import morgan from 'morgan';
import { http } from 'winston';
import mainRouter from './routers/main.router';
import { expiryTransactionSchedule } from './jobs/cron/expiry.transactions.schedule';
import { createBullBoard } from '@bull-board/api';
import { ExpressAdapter } from '@bull-board/express';
import { BullMQAdapter } from '@bull-board/api/bullMQAdapter';
import { expiryTransactionQueue } from './jobs/bull/expiry.transaction.queue';

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
// ✅ Bull Board
const serverAdapter = new ExpressAdapter();
serverAdapter.setBasePath('/admin/queues');

createBullBoard({
  queues: [new BullMQAdapter(expiryTransactionQueue)],
  serverAdapter,
});
app.use('/admin/queues', serverAdapter.getRouter());

// expiryTransactionSchedule();
app.use(mainRouter);

const port = 5000;

app.use((error: any, req: Request, res: Response, __: NextFunction) => {
  console.log(error);
  // loggerWinston.error(
  //   `[${req?.method}] ${req?.url} - ${error?.message}`,
  //   error
  // );
  res.status(500).json({
    success: false,
    message: error?.isExpose ? error?.message : 'Something went wrong',
  });
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
