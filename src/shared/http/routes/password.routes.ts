import { Router } from "express";
import { celebrate, Joi, Segments } from 'celebrate';
import ForgotPasswordController from "@modules/users/controllers/ForgotPasswordController";
import ResetPasswordController from "@modules/users/controllers/ResetPasswordController";

const passwordRouter = Router();
const forgotPasswordController = new ForgotPasswordController();
const resetPasswordController = new ResetPasswordController();

passwordRouter.post('/forgot', celebrate({
    [Segments.BODY]: {
        email: Joi.string().email().required(),
    }
}), forgotPasswordController.create);

passwordRouter.post('/reset', celebrate({
    [Segments.BODY]: {
        token: Joi.string().uuid().required(),
        password: Joi.string().required(),
        password_confirmation: Joi.string().required().valid(Joi.ref('password'))//verifica se a senha secundária enviada é igual a senha primária
    }
}), resetPasswordController.create);


export default passwordRouter;