import { Router } from 'express';
import farolPlanRoutes from './farol-plan.routes.js';

const routes = Router();

routes.get('/', (_, res) => res.send('Server running successful'));

routes.use('/farol-plan', farolPlanRoutes);

export default routes;
