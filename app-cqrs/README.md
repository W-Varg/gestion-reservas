# Sistema de Gestión de Reservas - Versión CQRS

## 📋 Descripción
Este proyecto implementa un sistema de gestión de reservas para espacios comunitarios utilizando NestJS y una arquitectura CQRS (Command Query Responsibility Segregation). Permite a los usuarios gestionar reservas de diferentes espacios como salones, auditorios y canchas, con una clara separación entre operaciones de lectura y escritura.

## 🚀 Requisitos Previos

- Node.js (v18 o superior)
- npm o yarn
- Git

## 📥 Instalación

1. Clonar el repositorio:
```bash
git clone https://github.com/W-Varg/gestion-reservas.git
cd gestion-reservas/app-cqrs
```

2. Instalar dependencias:
```bash
# Usando npm
npm install

# O usando yarn
yarn install
```

3. Configurar variables de entorno:
```bash
# Copiar el archivo de ejemplo
cp .env.example .env

# Editar el archivo .env con tus configuraciones
```

## 🛠️ Configuración de la Base de Datos

1. Instalar Prisma CLI globalmente (opcional):
```bash
npm install -g prisma
```

2. Generar el cliente de Prisma:
```bash
npx prisma generate
```

3. Ejecutar las migraciones:
```bash
npx prisma migrate dev
```

## 🏃‍♂️ Ejecución

### Desarrollo
```bash
# Iniciar en modo desarrollo
npm run start:dev

# O usando yarn
yarn start:dev
```

### Producción
```bash
# Construir la aplicación
npm run build

# Iniciar en modo producción
npm run start:prod
```

## 🧪 Pruebas

```bash
# Ejecutar pruebas unitarias
npm run test

# Ejecutar pruebas e2e
npm run test:e2e

# Ejecutar pruebas con cobertura
npm run test:cov
```

## 📚 Estructura del Proyecto

```
app-cqrs/
├── src/
│   ├── modules/
│   │   ├── users/
│   │   │   ├── commands/
│   │   │   │   ├── create-user/
│   │   │   │   └── update-user/
│   │   │   ├── queries/
│   │   │   │   ├── get-user/
│   │   │   │   └── list-users/
│   │   │   └── events/
│   │   │       ├── user-created/
│   │   │       └── user-updated/
│   │   ├── spaces/
│   │   ├── reservations/
│   │   └── notifications/
│   ├── shared/
│   └── main.ts
├── test/
├── prisma/
└── package.json
```

## 🔧 Scripts Disponibles

- `npm run start`: Inicia la aplicación
- `npm run start:dev`: Inicia la aplicación en modo desarrollo
- `npm run start:debug`: Inicia la aplicación en modo debug
- `npm run start:prod`: Inicia la aplicación en modo producción
- `npm run build`: Compila la aplicación
- `npm run test`: Ejecuta las pruebas unitarias
- `npm run test:e2e`: Ejecuta las pruebas e2e
- `npm run test:cov`: Ejecuta las pruebas con cobertura
- `npm run lint`: Ejecuta el linter
- `npm run format`: Formatea el código

## 📦 Dependencias Principales

- NestJS
- TypeScript
- Prisma
- SQLite
- Jest
- Class Validator
- Class Transformer
- @nestjs/cqrs

## 🔍 Endpoints API

### Usuarios
- `POST /users`: Crear usuario (Command)
- `GET /users`: Listar usuarios (Query)
- `GET /users/:id`: Obtener usuario por ID (Query)
- `PUT /users/:id`: Actualizar usuario (Command)
- `DELETE /users/:id`: Eliminar usuario (Command)

### Espacios
- `POST /spaces`: Crear espacio (Command)
- `GET /spaces`: Listar espacios (Query)
- `GET /spaces/:id`: Obtener espacio por ID (Query)
- `PUT /spaces/:id`: Actualizar espacio (Command)
- `DELETE /spaces/:id`: Eliminar espacio (Command)

### Reservas
- `POST /reservations`: Crear reserva (Command)
- `GET /reservations`: Listar reservas (Query)
- `GET /reservations/:id`: Obtener reserva por ID (Query)
- `PUT /reservations/:id`: Actualizar reserva (Command)
- `DELETE /reservations/:id`: Eliminar reserva (Command)

## 🏗️ Arquitectura CQRS

### Comandos
Los comandos representan operaciones de escritura que modifican el estado del sistema:
```typescript
export class CreateReservationCommand {
  constructor(
    public readonly spaceId: string,
    public readonly userId: string,
    public readonly date: Date
  ) {}
}
```

### Queries
Las queries representan operaciones de lectura que no modifican el estado:
```typescript
export class GetSpaceAvailabilityQuery {
  constructor(
    public readonly spaceId: string,
    public readonly date: Date
  ) {}
}
```

### Eventos
Los eventos se emiten cuando ocurren cambios en el sistema:
```typescript
export class ReservationCreatedEvent {
  constructor(
    public readonly reservationId: string,
    public readonly spaceId: string,
    public readonly userId: string,
    public readonly date: Date
  ) {}
}
```

## 🤝 Contribución

1. Fork el repositorio
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📝 Licencia

Este proyecto está bajo la Licencia MIT.

## 👥 Autor

Wilver Vargas Anagua
