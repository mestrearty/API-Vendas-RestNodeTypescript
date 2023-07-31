import { getCustomRepository } from "typeorm";
import AppError from "@shared/errors/AppError";
import User from "../infra/typeorm/entities/User";
import UsersRepository from "../infra/typeorm/repositories/UsersRepository";

interface IRequest {
    user_id: string;
}

class ShowProfileService {
    public async execute({ user_id }: IRequest): Promise<User> {
        const usersRepository = getCustomRepository(UsersRepository);

        const user = await usersRepository.findById(user_id); //preparando objeto para o banco de dados

        if (!user) throw new AppError('Usuário não encontrado');

        return user;
    }
}

export default ShowProfileService; 