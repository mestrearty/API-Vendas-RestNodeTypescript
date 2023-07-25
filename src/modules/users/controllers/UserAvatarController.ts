import { Request, Response } from "express";
import UpdateUserAvatarService from "../services/UpdateUserAvatarService";

export default class UserAvatarController {

    public async uptade(request: Request, response: Response): Promise<Response> {
        const updateAvatar = new UpdateUserAvatarService();
        console.log(request.file)
        const user = updateAvatar.execute(
            {
                user_id: request.user.id,
                avatarFilename: request.file?.filename as string
            }
        );
        return response.json(user);
    }

}