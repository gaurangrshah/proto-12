import { PrismaClient } from '@prisma/client';

import { createTestUser } from '../lib/prisma/utils/user';

const prisma = new PrismaClient();

const roles = {
  ADMIN: 101,
  USER: 2,
  UNVERIFIED: 1,
  ANON: 0,
};

async function main() {
  await prisma.$transaction(
    Object.keys(roles).map((type) => {
      return prisma.role.upsert({
        where: { type },
        update: {},
        create: {
          type,
          level: roles[type as keyof typeof roles],
        },
      });
    })
  );

  const newUser = createTestUser({ email: 'testNew@e2e.test' });

  await prisma.user.upsert({
    where: { email: String(newUser.email) },
    update: {},
    create: {
      ...newUser,
    },
  });
}
main()
  .catch(async (e) => {
    console.error('❌ Error Seeding', e);
    await prisma.$disconnect();
    process.exit(1);
  })
  .finally(async () => {
    console.log('🌱 Seeding Complete');
    await prisma.$disconnect();
  });
