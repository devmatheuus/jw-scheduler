import { DataSource } from 'typeorm';

export const appDataSource = new DataSource({
  type: 'sqlite',
  database: 'src/database/database.sqlite',
  entities: ['src/models/*.ts'],
  migrations: ['src/migrations/*.ts'],
  synchronize: true,
  logging: false,
});
