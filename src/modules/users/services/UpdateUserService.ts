import { getCustomRepository } from "typeorm";
import UsersRepository from "../infra/typeorm/repositories/UsersRepository";
import AppError from "@shared/errors/AppError";
import User from "../infra/typeorm/entities/User";

interface IRequest {
    id: string;
    name: string;
    email: string;
    password: string;
}
class UpdateUserService {
    public async execute({ id, name, email, password }: IRequest): Promise<User> {
        const usersRepository = getCustomRepository(UsersRepository);

        const user = await usersRepository.findOne(id); //procurando o produto no banco
        if (!user) throw new AppError('Produto não encontrado'); //verifica se há o produto

        const userExists = await usersRepository.findByName(name);//procurando se existe algum produto no banco com o nome que está querendo salvar
        if (userExists && name != user.name) throw new AppError('Já existe um produto cadastrado com esse nome');

        user.name = name;
        user.email = email;
        user.password = password;

        await usersRepository.save(user);

        return user;
    }
}

export default UpdateUserService; 