import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const user = await prisma.$transaction(async (prisma) => {
    const adminUser = await prisma.user.create({
      data: {
        name: 'Admin User',
        email: 'admin_user@gmail.com',
        password: 'passwordSegura123',
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
