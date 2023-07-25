import { getCustomRepository } from "typeorm";
import AppError from "@shared/errors/AppError";
import UsersRepository from "../typeorm/repositories/UsersRepository";
import User from "../typeorm/entities/User";
import path from "path";
import uploadConfig from '@config/upload';
import fs from 'fs';

interface IRequest {
    user_id: string;
    avatarFilename: string;
}

class UpdateUserAvatarService {
    public async execute({ user_id, avatarFilename }: IRequest): Promise<User> {
        const usersRepository = getCustomRepository(UsersRepository);
        const user = await usersRepository.findById(user_id);

        if (!user) throw new AppError('Usuário não encontrado');
        if (user.avatar) {
            const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar); //monta o caminho de armazenamento do avatar

            const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath);// verifica se já tem um arquivo
            if (userAvatarFileExists) await fs.promises.unlink(userAvatarFilePath);// remove o arquivo se já existir um
        }

        user.avatar = avatarFilename;
        await usersRepository.save(user);

        return user;
    }
}

export default UpdateUserAvatarService;