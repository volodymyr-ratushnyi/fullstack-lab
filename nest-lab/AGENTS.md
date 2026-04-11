# AGENTS.md

## Architecture Overview
This is a NestJS application following Clean Architecture with CQRS for the user module. The app supports dual databases (MongoDB via Mongoose, PostgreSQL via Prisma) with configurable switching via `DB_TYPE` env var. Currently, user operations use MongoDB repositories.

Key layers:
- **Domain**: Entities (e.g., `src/user/domain/user.entity.ts`), abstract repositories
- **Application**: CQRS commands/queries (e.g., `src/user/application/commands/create-user/`), DTOs with class-validator
- **Infrastructure**: Database implementations (Mongo/Postgres), mappers, schemas

Auth module uses standard service pattern without CQRS.

## CQRS Patterns
Use CommandBus for writes, QueryBus for reads in user module. Commands validate uniqueness via read repo before writing.

Example: `CreateUserHandler` checks email existence via `UserReadRepository.findByEmailOrUsername()` before creating user.

Handlers inject both write and read repositories.

## Database Switching
Set `DB_TYPE` to 'mongodb' or 'postgres' in env. User module providers are hardcoded to Mongo; switch comments in `src/user/user.module.ts` for Postgres.

Prisma schema defines User model for Postgres; Mongoose schema in `src/user/infrastructure/schemas/user.schema.ts` for Mongo.

## DTOs and Validation
All DTOs use class-validator decorators. User entity is immutable with constructor params.

Mappers convert between domain and persistence: `UserMapper.toPersistence()` returns CreateUserDto-like object.

## Config and Env
Use Zod schema in `src/config/config.schema.ts` for env validation. AppConfigService provides typed access.

Required env: `MONGO_URL`, `POSTGRES_URL`, `JWT_SECRET`, `COOKIES_SECRET`, `DB_TYPE`.

## Testing
Jest setup in `package.json`. Run `yarn test:e2e` for end-to-end tests. Unit tests in `*.spec.ts` files.

## Build and Run
- Dev: `yarn start:dev`
- Prod: `yarn build && yarn start:prod`
- Debug: `yarn start:debug`
- Format: `yarn format`
- Lint: `yarn lint`

Dockerfile builds multi-stage with Yarn workspaces.

## Key Files
- `src/app.module.ts`: Imports modules
- `src/user/user.module.ts`: CQRS setup, repo providers
- `prisma/schema.prisma`: Postgres schema
- `src/user/infrastructure/repositories/mongo/user-mongo.mapper.ts`: Mongo-specific mapping (_id to id)</content>
<parameter name="filePath">E:\WebstormProjects\fullstack-lab\nest-lab\AGENTS.md
