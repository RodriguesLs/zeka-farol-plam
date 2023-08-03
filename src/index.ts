import express from 'express';
import 'dotenv/config'
import cors from 'cors';
import routes from './routes/index.js';

const PORT = process.env.PORT || 8088;
const server = express();

server.use((_, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", 'GET,PUT,POST,DELETE');

  server.use(cors());

  next();
});

server.use(express.json());
server.use(routes);

server.listen(PORT, () => console.log(`Server running in: ${PORT}`));
