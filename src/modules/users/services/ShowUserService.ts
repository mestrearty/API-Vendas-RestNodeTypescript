import { getCustomRepository } from "typeorm";
import UsersRepository from "../typeorm/repositories/UsersRepository";
import AppError from "@shared/errors/AppError";
import User from "../typeorm/entities/User";

interface IRequest {
    id: string;
}

class ShowUserService {
    public async execute({ id }: IRequest): Promise<User | undefined> {
        const usersRepository = getCustomRepository(UsersRepository);

        const user = await usersRepository.findOne(id); //procurando o produto no banco
        if (!user) throw new AppError('Produto não encontrado');

        return user;
    }
}

export default ShowUserService; 