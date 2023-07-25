import { getCustomRepository } from "typeorm";
import AppError from "@shared/errors/AppError";
import UsersRepository from "../typeorm/repositories/UsersRepository";
import User from "../typeorm/entities/User";
import { compare, hash } from "bcryptjs";

interface IRequest {
    email: string;
    password: string;
}

interface IResponse {
    user: User;
}
class CreateSessionsService {
    public async execute({ email, password }: IRequest): Promise<IResponse> {
        const usersRepository = getCustomRepository(UsersRepository);
        const user = await usersRepository.findByEmail(email);

        if (!user) throw new AppError('Não existe um usuário cadastrado com esse email', 401);

        const passwordConfirm = await compare(password, user.password);

        if (!passwordConfirm) throw new AppError('Senha incorreta', 401);



        return { user };
    }
}

export default CreateSessionsService;