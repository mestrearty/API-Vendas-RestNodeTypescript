import { getCustomRepository } from "typeorm";
import AppError from "@shared/errors/AppError";
import UsersRepository from "../infra/typeorm/repositories/UsersRepository";
import User from "../infra/typeorm/entities/User";
import authConfig from "@config/auth";
import { compare, hash } from "bcryptjs";
import { sign } from "jsonwebtoken";

interface IRequest {
    email: string;
    password: string;
}

interface IResponse {
    user: User;
    token: string;
}
class CreateSessionsService {
    public async execute({ email, password }: IRequest): Promise<IResponse> {
        const usersRepository = getCustomRepository(UsersRepository);
        const user = await usersRepository.findByEmail(email);

        if (!user) throw new AppError('Não existe um usuário cadastrado com esse email', 401);

        const passwordConfirm = await compare(password, user.password);

        if (!passwordConfirm) throw new AppError('Senha incorreta', 401);

        const token = sign({}, authConfig.jwt.secret, {
            subject: user.id,
            expiresIn: authConfig.jwt.expiresIn
        });

        return { user, token };
    }
}

export default CreateSessionsService;