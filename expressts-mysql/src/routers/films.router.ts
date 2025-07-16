import Router from 'express';
import { findFilmsController } from '../controllers/films.controller';
const filmsRouter = Router();

filmsRouter.get('/', findFilmsController);

export default filmsRouter;