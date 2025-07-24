import { prisma } from '../../db/connection';
import { User } from '../../generated/prisma';
import bcrypt, { compare } from 'bcrypt';
import { transporter } from '../../lib/transporter';
import Handlebars from 'handlebars';
import fs from 'fs';
import { jwtSign } from '../../lib/jwt.sign';

export const authRegisterService = async ({
  fullName,
  email,
  password = 'newEmployee2025',
  role,
  shiftId,
}: Omit<
  User,
  'id' | 'createdAt' | 'updatedAt' | 'deletedAt' | 'leaveBalance'
>) => {
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  const createdUser = await prisma.user.create({
    data: {
      fullName,
      email,
      password: hashedPassword,
      role,
      shiftId,
    },
  });

  const token = await jwtSign(
    { userId: createdUser?.id },
    process.env.JWT_SECRET_KEY!,
    { algorithm: 'HS256' }
  );

  const templateHtml = fs.readFileSync('src/public/template.html', 'utf-8');
  const compiledTemplateHtml = Handlebars.compile(templateHtml);
  const resultTemplateHtml = compiledTemplateHtml({
    fullName,
    companyName: 'JCWDOL-021',
    resetLinkPassword: `${process.env.LINK_RESET_PASSWORD}/${token}`,
  });

  await transporter.sendMail({
    to: email,
    subject: 'Welcome to Our Company',
    html: resultTemplateHtml,
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

  const token = jwtSign(
    { userId: findUserByEmail?.id, role: findUserByEmail?.role },
    process.env.JWT_SECRET_KEY!,
    { algorithm: 'HS256' }
  );

  return {
    token,
    fullName: findUserByEmail?.fullName,
    role: findUserByEmail?.role,
  };
};

export const resetPasswordService = async ({
  id,
  password,
}: Pick<User, 'id' | 'password'>) => {
  const findUserById = await prisma.user.findUnique({ where: { id } });

  if (!findUserById)
    throw { message: `User with id = ${id} is not found`, isExpose: true };

  const hashedPassword = await bcrypt.hash(password, 10);

  await prisma.user.update({
    data: { password: hashedPassword },
    where: { id },
  });
};

// Mendaftarkan karyawan baru -> HR -> Password default -> Email reset password sekaligus aktivasi akunnya
