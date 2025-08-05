import cron from 'node-cron';
import { expiryTransactionsJob } from './expiry.transactions.job';

export const expiryTransactionSchedule = () => {
  cron.schedule('* * * * *', async () => {
    await expiryTransactionsJob();
  });
};
