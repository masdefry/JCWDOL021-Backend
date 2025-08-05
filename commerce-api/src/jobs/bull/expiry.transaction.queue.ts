import { Worker, Queue } from 'bullmq';
import { prisma } from '../../prisma/prisma.client';
import IORedis from 'ioredis';

const redisConnection = new IORedis({ maxRetriesPerRequest: null });

export const expiryTransactionQueue = new Queue('expiry-transaction', {
  connection: redisConnection,
});

export const expiryTransactionWorker = new Worker(
  'expiry-transaction',
  async (job) => {
    const { transactionId } = job.data;

    await prisma.transaction.update({
      where: {
        status: 'WAITING_FOR_PAYMENT',
        id: transactionId,
      },
      data: {
        status: 'EXPIRED',
      },
    });

    console.log(`Transaction with id = ${transactionId} has been expiry`);
  },
  {
    connection: redisConnection,
  }
);
