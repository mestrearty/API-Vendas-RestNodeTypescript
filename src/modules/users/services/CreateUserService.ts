import { getCustomRepository } from "typeorm";
import AppError from "@shared/errors/AppError";
import UsersRepository from "../typeorm/repositories/UsersRepository";
import User from "../typeorm/entities/User";

interface IRequest {
    name: string;
    email: string;
    password: string;
}
class CreateUserService {
    public async execute({ name, email, password }: IRequest): Promise<User> {
        const usersRepository = getCustomRepository(UsersRepository);
        const emailExists = await usersRepository.findByEmail(email);

        if (emailExists) throw new AppError('Já existe um usuário cadastrado com esse email');

        const user = usersRepository.create({ name, email, password }); //preparando objeto para o banco de dados

        await usersRepository.save(user);
        return user;
    }
}

export default CreateUserService;