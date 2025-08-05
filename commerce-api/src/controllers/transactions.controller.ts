import { Request, Response } from 'express';
import { prisma } from '../prisma/prisma.client';
import { addMinutes } from 'date-fns';
import { expiryTransactionQueue } from '../jobs/bull/expiry.transaction.queue';

export const createTransactionController = async (
  req: Request,
  res: Response
) => {
  const { productId, quantity } = req.body;

  const product = await prisma.product.findUnique({ where: { id: productId } });

  if (!product)
    throw {
      isOperational: true,
      message: `Product with id = ${productId} not found`,
    };

  const createdTransaction = await prisma.transaction.create({
    data: {
      productId,
      quantity,
      totalPrice: Number(product?.price) * quantity,
      expiryAt: addMinutes(new Date(), 1),
    },
  });

  await expiryTransactionQueue.add(
    `expiry-transaction-with-id-${createdTransaction?.id}`,
    { transactionId: createdTransaction?.id },
    { delay: 1 * 60 * 1000 } // 60000ms -> 1m
  ); 

  res.status(201).json({
    success: true,
    message: 'Create transaction successfull',
    data: {
      productId,
      quantity,
      totalPrice: Number(product?.price) * quantity,
    },
  });
};

// Cron-Job
// Bull-Queue
