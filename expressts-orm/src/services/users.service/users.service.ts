import { prisma } from '../../db/connection';
import { IUsersProps } from './types';

export const createUserService = async ({ name, email, password }: Omit<IUsersProps, 'id'>) => {
  await prisma.user.create({
    data: {
      name,
      email,
      password,
    },
  });
};

export const findUsersService = async() => {
  return await prisma.user.findMany({
    select: {
      email: true, 
      name: true
    }
  })
}