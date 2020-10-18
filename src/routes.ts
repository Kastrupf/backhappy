import { Router } from 'express';
import FoyersController from './controllers/FoyersController';

const routes = Router();

routes.post('/foyers', FoyersController.create);

export default routes;