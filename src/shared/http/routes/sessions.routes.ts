import SessionsController from "@modules/users/controllers/SessionsController";
import { Router } from "express";
import { celebrate, Joi, Segments } from 'celebrate';

const sessionsRouter = Router();
const usersController = new SessionsController();

sessionsRouter.post('/', celebrate({
    [Segments.BODY]: {
        email: Joi.string().email().required(),
        password: Joi.string().required()
    }
}), usersController.create);


export default sessionsRouter;