import 'dotenv/config';
import app from './app';
import { AppDataSource } from './config/database';

const PORT = process.env.PORT;

async function main() {
  try {
    await AppDataSource.initialize();
    console.log('Conexión a la base de datos establecida');
  } catch (error) {
    console.error('Error al conectar a la base de datos:', error.message);
  }
  app.listen(PORT, () => {
    console.log(`API funcionando en el puerto http://localhost:${PORT}/api-expense-tracker`);
  });
}

main();