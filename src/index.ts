import express, { Request, Response } from 'express';
import { downloadPlan } from './controllers/farolPlan.js';
import 'dotenv/config'
import cors from 'cors';

const PORT = process.env.PORT || 8088;
const server = express();

server.use((_, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", 'GET,PUT,POST,DELETE');

  server.use(cors());

  next();
});

server.use(express.json());

server.get('/', (req, res) => res.send('Server running successful'));

server.get('/farol-plan', async (req: Request, res: Response) => {
  const response = await downloadPlan();

  res.status(response.status).json(response.data.history);
});

server.listen(PORT, () => console.log(`Server running in: ${PORT}`));
