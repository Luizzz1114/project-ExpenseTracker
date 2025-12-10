import express from 'express';
import cors from 'cors';
import router from './routes';

const app = express();
app.use(cors({ origin: '*' }));
app.use(express.json());

app.use('/api-expense-tracker', router);

export default app;