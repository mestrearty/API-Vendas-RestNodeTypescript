import { Request, Response } from "express";
import CreateUserService from "../../../services/CreateUserService";
import ListUserService from "../../../services/ListUserService";
import ShowUserService from "../../../services/ShowUserService";
import UpdateUserService from "../../../services/UpdateUserService";
import DeleteUserService from "../../../services/DeleteUserService";
import { instanceToInstance } from 'class-transformer';

export default class UsersController {

    public async index(request: Request, response: Response): Promise<Response> {
        const listUsers = new ListUserService();

        const users = await listUsers.execute();
        return response.json(instanceToInstance(users));
    }

    public async show(request: Request, response: Response): Promise<Response> {

        const { id } = request.params;
        const showUsers = new ShowUserService();

        const user = await showUsers.execute({ id });

        return response.json(instanceToInstance(user));

    }

    public async create(request: Request, response: Response): Promise<Response> {
        const { name, email, password } = request.body;
        const createUser = new CreateUserService();

        const user = await createUser.execute({ name, email, password });
        return response.json(instanceToInstance(user));
    }

    public async uptade(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;
        const { name, email, password } = request.body;
        const updateUser = new UpdateUserService();

        const user = await updateUser.execute({ id, name, email, password });

        return response.json(instanceToInstance(user));
    }
    public async delete(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;


        const delateUser = new DeleteUserService();

        await delateUser.execute({ id });

        return response.json([]);
    }

}