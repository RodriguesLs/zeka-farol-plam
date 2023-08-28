import { Router, Request, Response } from 'express';
import { downloadFarolPlan, downloadLatestActivitiesPlan, updateCoursesHistories } from '../controllers/farolPlan.js';

const farolPlanRouter = Router();

farolPlanRouter.get('/farol/register', async (req: Request, res: Response) => {
  const response = await updateCoursesHistories();

  res.status(response?.status).json({ ...response?.data?.history, errors: response?.err });
});

farolPlanRouter.get('/farol', async (req: Request, res: Response) => {
  const response = await downloadFarolPlan();

  res.status(response?.status).json({ ...response?.data?.history, errors: response?.err });
});

farolPlanRouter.get('/latest-activities', async (req: Request, res: Response) => {
  const response = await downloadLatestActivitiesPlan();

  res.status(response?.status).json(response?.data);
});

export default farolPlanRouter;
