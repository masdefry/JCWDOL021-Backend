import { Router } from 'express';
import {
  createUserController,
  findUsersController,
} from '../controllers/users.controller';
const usersRouter = Router();

usersRouter.post('/', createUserController);
usersRouter.get('/', findUsersController);

export default usersRouter;
