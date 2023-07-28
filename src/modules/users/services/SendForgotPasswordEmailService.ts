import { getCustomRepository } from "typeorm";
import AppError from "@shared/errors/AppError";
import UsersRepository from "../typeorm/repositories/UsersRepository";
import UserTokensRepository from '../typeorm/repositories/UserTokensRepository';
import UserToken from "../typeorm/entities/UserToken";

interface IRequest {
    email: string;
}
class SendForgotPasswordEmailService {
    public async execute({ email }: IRequest): Promise<UserToken | undefined> {
        const usersRepository = getCustomRepository(UsersRepository);
        const userTokensRepository = getCustomRepository(UserTokensRepository);

        const user = await usersRepository.findByEmail(email);
        if (!user) throw new AppError('User does not exists with this email');

        const token = await userTokensRepository.generate(user.id);

        return token;
    }
}

export default SendForgotPasswordEmailService;