import { PrismaClient, ReservationStatus } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Limpiar la base de datos de reservas
  await prisma.reservation.deleteMany();

  // Obtener usuarios y espacios existentes
  const users = await prisma.user.findMany();
  const spaces = await prisma.space.findMany();

  if (users.length === 0 || spaces.length === 0) {
    console.log('No hay usuarios o espacios para crear reservas.');
    return;
  }

  // Crear 10 reservas con diferentes estados
  const statuses = [
    ReservationStatus.PENDING,
    ReservationStatus.CONFIRMED,
    ReservationStatus.CANCELLED,
  ];

  for (let i = 0; i < 10; i++) {
    const user = users[i % users.length];
    const space = spaces[i % spaces.length];
    const status = statuses[i % statuses.length];
    const now = new Date();
    await prisma.reservation.create({
      data: {
        date: now,
        startTime: new Date(now.getTime() + 60 * 60 * 1000 * i),
        endTime: new Date(now.getTime() + 60 * 60 * 1000 * (i + 1)),
        status,
        userId: user.id,
        spaceId: space.id,
      },
    });
  }

  console.log('Seeder completado: reservas creadas');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 