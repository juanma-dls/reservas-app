import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const user = await prisma.$transaction(async (prisma) => {
    const hashedPassword = await bcrypt.hash('passwordSegura123', 10);
    const adminUser = await prisma.user.create({
      data: {
        name: 'Admin User',
        email: 'admin_user@gmail.com',
        password: hashedPassword,
        type: 'ADMIN',
      },
    });

    return adminUser;
  });
  console.log('Admin user created:', user);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
