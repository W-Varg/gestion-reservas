import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  // Limpiar la base de datos
  await prisma.user.deleteMany();

  // Crear 20 usuarios de prueba
  const users: { email: string; password: string; name: string }[] = [];
  for (let i = 1; i <= 20; i++) {
    const hashedPassword = await bcrypt.hash('password123', 10);
    users.push({
      email: `usuario${i}@test.com`,
      password: hashedPassword,
      name: `Usuario ${i}`,
    });
  }

  // Insertar usuarios en la base de datos
  for (const user of users) {
    await prisma.user.create({
      data: user,
    });
  }

  console.log('Seeder completado: 20 usuarios creados');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 