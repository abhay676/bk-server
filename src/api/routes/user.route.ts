import { Router } from 'express';
import UserController from '../controllers/user.controller';
const route = Router();

export default (app: Router) => {
  app.use('/user', route);
  route.post('/signup', UserController.signup);
  route.post('/login', UserController.login);
};
