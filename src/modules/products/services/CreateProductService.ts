import { getCustomRepository } from "typeorm";
import ProductsRepository from "../typeorm/repositories/ProcductsRepository";
import AppError from "@shared/errors/AppError";
import Product from "../typeorm/entities/product";

interface IRequest {
    name: string;
    price: number;
    quantity: number;
}
class CreateProductService {
    public async execute({ name, price, quantity }: IRequest): Promise<Product> {
        const productsRepository = getCustomRepository(ProductsRepository);
        const producExists = await productsRepository.findByName(name);

        if (producExists) throw new AppError('Já existe um produto cadastrado com esse nome');

        const product = productsRepository.create({ name, price, quantity }); //preparando objeto para o banco de dados

        await productsRepository.save(product);
        return product;
    }
}

export default CreateProductService;