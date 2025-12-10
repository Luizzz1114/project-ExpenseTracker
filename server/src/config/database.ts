import 'dotenv/config';
import { DataSource } from 'typeorm';
import { Usuarios } from '../models/usuarios.models';
import { Categorias } from '../models/categorias.model';
import { Transacciones } from '../models/transacciones.model';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.PG_HOST,
  port: Number(process.env.PG_PORT),
  username: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  database: process.env.PG_DATABASE,
  logging: true,
  entities: [Usuarios, Categorias, Transacciones],
  synchronize: false
});