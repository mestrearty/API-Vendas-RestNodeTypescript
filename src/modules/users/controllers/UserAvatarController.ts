import { Request, Response } from "express";
import CreateUserService from "../services/CreateUserService";
import ListUserService from "../services/ListUserService";
import ShowUserService from "../services/ShowUserService";
import UpdateUserService from "../services/UpdateUserService";
import DeleteUserService from "../services/DeleteUserService";
import UpdateUserAvatarService from "../services/UpdateUserAvatarService";

export default class UserAvatarController {

    public async uptade(request: Request, response: Response): Promise<Response> {
        const updateAvatar = new UpdateUserAvatarService();

        const user = updateAvatar.execute(
            {
                user_id: request.user.id,
                avatarFilename: request.file?.filename as string
            }
        );
        return response.json(user);
    }

}