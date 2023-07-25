import UsersController from "@modules/users/controllers/UsersController";
import { Router } from "express";
import { celebrate, Joi, Segments } from 'celebrate';
import isAuthenticated from "@modules/users/middlewares/isAuthenticated";

const usersRouter = Router();
const usersController = new UsersController();


usersRouter.get('/', isAuthenticated, usersController.index);

usersRouter.get('/:id',
    celebrate({ [Segments.PARAMS]: { id: Joi.string().uuid().required() } }),
    usersController.show);

usersRouter.post('/', celebrate({
    [Segments.BODY]: {
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().required()
    }
}), usersController.create);

usersRouter.put('/:id', celebrate({
    [Segments.BODY]: {
        name: Joi.string(),
        email: Joi.string(),
        password: Joi.string()
    }
}), usersController.uptade);

usersRouter.delete('/:id', celebrate({ [Segments.PARAMS]: { id: Joi.string().uuid().required() } }),
    usersController.delete);


export default usersRouter;