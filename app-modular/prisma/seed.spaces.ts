import { PrismaClient, SpaceType } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Limpiar la base de datos de espacios
  await prisma.space.deleteMany();

  const spaces = [
    { name: 'Salón Principal', type: SpaceType.SALON, capacity: 100, description: 'Salón grande para eventos.' },
    { name: 'Salón VIP', type: SpaceType.SALON, capacity: 30, description: 'Salón exclusivo para reuniones privadas.' },
    { name: 'Auditorio Central', type: SpaceType.AUDITORIO, capacity: 200, description: 'Auditorio con capacidad para 200 personas.' },
    { name: 'Auditorio Pequeño', type: SpaceType.AUDITORIO, capacity: 50, description: 'Auditorio para presentaciones pequeñas.' },
    { name: 'Cancha de Fútbol', type: SpaceType.CANCHA, capacity: 22, description: 'Cancha de césped sintético.' },
    { name: 'Cancha de Básquet', type: SpaceType.CANCHA, capacity: 10, description: 'Cancha techada para básquetbol.' },
  ];

  for (const space of spaces) {
    await prisma.space.create({ data: space });
  }

  console.log('Seeder completado: espacios creados');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 