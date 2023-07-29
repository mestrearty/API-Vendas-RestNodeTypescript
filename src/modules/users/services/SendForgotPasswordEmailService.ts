import { getCustomRepository } from "typeorm";
import AppError from "@shared/errors/AppError";
import UsersRepository from "../typeorm/repositories/UsersRepository";
import UserTokensRepository from '../typeorm/repositories/UserTokensRepository';
import UserToken from "../typeorm/entities/UserToken";
import EtherealMail from "@config/mail/EtherealMail";

interface IRequest {
    email: string;
}
class SendForgotPasswordEmailService {
    public async execute({ email }: IRequest): Promise<UserToken | undefined> {
        const usersRepository = getCustomRepository(UsersRepository);
        const userTokensRepository = getCustomRepository(UserTokensRepository);

        const user = await usersRepository.findByEmail(email);
        if (!user) throw new AppError('User does not exists with this email');

        const userToken = await userTokensRepository.generate(user.id);

        await EtherealMail.sendMail({
            to: {
                name: user.name,
                email: user.email
            },
            subject: 'Repuceração de senha - API Vendas',
            templateData: {
                template: `Bom dia {{name}}! Seu token de redefinição é: {{token}}`,
                variables: {
                    name: user.name,
                    token: userToken.token
                }
            }
        });

        return userToken;
    }
}

export default SendForgotPasswordEmailService;