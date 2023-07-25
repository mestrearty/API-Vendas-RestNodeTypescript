import { getCustomRepository } from "typeorm";
import AppError from "@shared/errors/AppError";
import User from "../typeorm/entities/User";
import UsersRepository from '../typeorm/repositories/UsersRepository';


class ListUserService {
    public async execute(): Promise<User[]> {
        const usersRepository = getCustomRepository(UsersRepository);

        const products = usersRepository.find(); //preparando objeto para o banco de dados

        return products;
    }
}

export default ListUserService; 