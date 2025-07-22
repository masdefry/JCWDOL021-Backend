import { prisma } from '../../db/connection';
import { User } from '../../generated/prisma';
import bcrypt, { compare } from 'bcrypt';
import jwt from 'jsonwebtoken';

export const authRegisterService = async ({
  fullName,
  email,
  password = 'newEmployee2025',
  role,
  shiftId
}: Omit<User, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt' | 'leaveBalance'>) => {
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  await prisma.user.create({
    data: {
      fullName,
      email,
      password: hashedPassword,
      role,
      shiftId
    },
  });
};

export const authLoginService = async ({
  email,
  password,
}: Pick<User, 'email' | 'password'>) => {

  const findUserByEmail = await prisma.user.findFirst({
    where: { email },
  });

  if (!findUserByEmail)
    throw { message: 'Email is not register', isExpose: true };

  const comparePassword = await bcrypt.compare(
    password,
    findUserByEmail?.password
  );

  if (!comparePassword) throw { message: 'Password not valid', isExpose: true };

  const token = await jwt.sign(
    { userId: findUserByEmail?.id, role: findUserByEmail?.role },
    process.env.JWT_SECRET_KEY!,
    { algorithm: 'HS256' }
  );

  return token;
};

// password: abc12345 -> bcrypt asahsasah1212us8as8as8as

// Login? bcrypt.compare -> Compare password asli dengan password di hash
