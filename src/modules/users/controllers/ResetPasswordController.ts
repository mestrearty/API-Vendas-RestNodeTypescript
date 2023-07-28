import { Request, Response } from "express";
import ResetPasswordService from "../services/ResetPasswordService";
export default class ResetPasswordController {

    public async create(request: Request, response: Response): Promise<Response> {
        console.log(request.body)
        const { token, password } = request.body;
        const resetPassWordService = new ResetPasswordService();
        await resetPassWordService.execute({
            token, password
        });
        return response.status(204).json();
    }

}