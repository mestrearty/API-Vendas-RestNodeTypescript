import { Request, Response } from "express";
import CreateUserService from "../services/CreateUserService";
import ListUserService from "../services/ListUserService";
import ShowUserService from "../services/ShowUserService";
import UpdateUserService from "../services/UpdateUserService";
import DeleteUserService from "../services/DeleteUserService";

export default class UsersController {

    public async index(request: Request, response: Response): Promise<Response> {
        const listUsers = new ListUserService();
        console.log(request.user.id)
        const users = await listUsers.execute();
        return response.json(users);
    }

    public async show(request: Request, response: Response): Promise<Response> {

        const { id } = request.params;
        const showUsers = new ShowUserService();

        const user = await showUsers.execute({ id });

        return response.json(user);

    }

    public async create(request: Request, response: Response): Promise<Response> {
        const { name, email, password } = request.body;
        const createUser = new CreateUserService();

        const user = await createUser.execute({ name, email, password });
        return response.json(user);
    }

    public async uptade(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;
        const { name, email, password } = request.body;
        const updateUser = new UpdateUserService();

        const product = await updateUser.execute({ id, name, email, password });

        return response.json(product);
    }
    public async delete(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;


        const delateUser = new DeleteUserService();

        await delateUser.execute({ id });

        return response.json([]);
    }

}