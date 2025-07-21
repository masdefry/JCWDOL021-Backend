import { prisma } from '../../db/connection';
import { User } from '../../generated/prisma';
import { IUsersProps } from './types';

export const createUserService = async ({
  name,
  email,
  password,
}: Omit<IUsersProps, 'id'>) => {
  await prisma.user.create({
    data: {
      name,
      email,
      password,
    },
  });
};

export const findUsersService = async () => {
  return await prisma.user.findMany({
    select: {
      email: true,
      name: true,
    },
  });
};

export const updateUserService = async ({
  email,
  name,
  password,
  id,
}: Omit<User, 'createdAt' | 'updatedAt' | 'deletedAt'>) => {
  await prisma.user.update({
    data: {
      email,
      name,
      password,
    },
    where: { id },
  });
};

export const deleteUserService = async ({ id }: Pick<User, 'id'>) => {
  const findUserById = await prisma.user.findUnique({ where: { id } });

  if(!findUserById) throw { message: `User with id = ${id} not found`, isExpose: true }

  await prisma.user.delete({
    where: { id },
  });
};
