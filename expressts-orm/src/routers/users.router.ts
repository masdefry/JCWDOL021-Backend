import { Router } from 'express';
import {
  createUserController,
  deleteUserController,
  findUsersController,
  updateUserController,
} from '../controllers/users.controller';
const usersRouter = Router();

usersRouter.post('/', createUserController);
usersRouter.get('/', findUsersController);
usersRouter.put('/:id', updateUserController);
usersRouter.delete('/:id', deleteUserController);

export default usersRouter;
