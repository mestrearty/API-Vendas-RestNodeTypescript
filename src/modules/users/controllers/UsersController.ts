import { Request, Response } from "express";
import CreateUserService from "../services/CreateUserService";
import ListUserService from "../services/ListUserService";

export default class UsersController {

    public async index(request: Request, response: Response): Promise<Response> {
        const listUsers = new ListUserService();

        const users = await listUsers.execute();
        return response.json(users);
    }

    // public async show(request: Request, response: Response): Promise<Response> {

    //     const { id } = request.params;
    //     const showUsers = new CreateUserService();

    //     const user = await showUsers.execute();

    //     return response.json(user);

    // }

    public async create(request: Request, response: Response): Promise<Response> {
        const { name, email, password } = request.body;
        const createUser = new CreateUserService();

        const user = await createUser.execute({ name, email, password });
        return response.json(user);
    }

    // public async uptade(request: Request, response: Response): Promise<Response> {
    //     const { id } = request.params;
    //     const { name, price, quantity } = request.body;
    //     const updateProduct = new UpdateProductService();

    //     const product = await updateProduct.execute({ id, name, price, quantity });

    //     return response.json(product);
    // }
    // public async delete(request: Request, response: Response): Promise<Response> {
    //     const { id } = request.params;


    //     const delateProduct = new DeleteProductService();

    //     await delateProduct.execute({ id });

    //     return response.json([]);
    // }

}