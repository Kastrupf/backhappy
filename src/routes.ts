import { Router } from 'express';
import FoyersController from './controllers/FoyersController';

const routes = Router();

routes.get('/foyers', FoyersController.index);
routes.get('/foyers/:id', FoyersController.show);
routes.post('/foyers', FoyersController.create);

export default routes;