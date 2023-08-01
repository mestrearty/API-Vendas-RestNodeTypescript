import { getCustomRepository } from "typeorm";
import AppError from "@shared/errors/AppError";
import UsersRepository from "../typeorm/repositories/UsersRepository";
import UserTokensRepository from '../typeorm/repositories/UserTokensRepository';
import { isAfter, addHours } from "date-fns";
import { compare, hash } from "bcryptjs";

interface IRequest {
    token: string;
    password: string;
}
class ResetPasswordService {
    public async execute({ token, password }: IRequest): Promise<void> {
        const usersRepository = getCustomRepository(UsersRepository);
        const userTokensRepository = getCustomRepository(UserTokensRepository);

        const userToken = await userTokensRepository.findByToken(token);
        if (!userToken) throw new AppError('Token de usuário inexistente');

        const user = await usersRepository.findById(userToken.user_id);
        if (!user) throw new AppError('Token de usuário inexistente');

        const tokenCreatedAt = userToken.created_at;
        const compareDate = addHours(tokenCreatedAt, 2);//pega a hora atual e soma 2, ex: se for 9h vira 11h

        if (isAfter(Date.now(), compareDate)) throw new AppError('Token expirado'); //se a hora atual for maior que a hora gerada + 2, da erro

        user.password = await hash(password, 8);

        await usersRepository.save(user)
    }
}

export default ResetPasswordService;