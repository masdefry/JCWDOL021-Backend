import { prisma } from '../../prisma/prisma.client';

export const expiryTransactionsJob = async () => {
  const expiredTransaction = await prisma.transaction.updateMany({
    where: {
      status: 'WAITING_FOR_PAYMENT',
      expiryAt: {
        lt: new Date(),
      },
    },
    data: {
      status: 'EXPIRED',
    },
  });

  console.log(`[CRON] ${expiredTransaction.count} has been expiry`);
};
