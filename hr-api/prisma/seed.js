const { PrismaClient } = require('../src/generated/prisma');
const prisma = new PrismaClient();
const bcrypt = require('bcrypt');

const shift = [
  {
    startTime: new Date('2025-07-22 09:00:00'),
    endTime: new Date('2025-07-22 18:00:00'),
  },
  {
    startTime: new Date('2025-07-22 13:00:00'),
    endTime: new Date('2025-07-22 22:00:00'),
  },
];

const users = [
  {
    fullName: 'M Defryan',
    email: 'mdefryan@gmail.com',
    password: bcrypt.hashSync('abc12345', 10),
    role: 'HR',
    shiftId: 1,
  },
];

async function main() {
  //   await prisma.shift.createMany({
  //     data: shift,
  //   });

  await prisma.user.createMany({
    data: users,
  });
}

main()
  .catch((error) => {
    console.log(error);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
