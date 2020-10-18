import { Router } from 'express';
import multer from 'multer';

import uploadConfig from './config/upload';
import FoyersController from './controllers/FoyersController';

const routes = Router();
const upload = multer(uploadConfig);

routes.get('/foyers', FoyersController.index);
routes.get('/foyers/:id', FoyersController.show);
routes.post('/foyers', upload.array('images') , FoyersController.create);

export default routes;