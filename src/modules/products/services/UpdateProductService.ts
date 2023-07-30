import { getCustomRepository } from "typeorm";
import ProductsRepository from "../typeorm/repositories/ProcductsRepository";
import AppError from "@shared/errors/AppError";
import Product from "../typeorm/entities/product";

interface IRequest {
    id: string;
    name: string;
    price: number;
    quantity: number;
}

class UpdateProductService {
    public async execute({ id, name, price, quantity }: IRequest): Promise<Product> {
        const productsRepository = getCustomRepository(ProductsRepository);

        const product = await productsRepository.findOne(id); //procurando o produto no banco
        if (!product) throw new AppError('Produto não encontrado'); //verifica se há o produto

        const producExists = await productsRepository.findByName(name);//procurando se existe algum produto no banco com o nome que está querendo salvar
        if (producExists && name != product.name) throw new AppError('Já existe um produto cadastrado com esse nome');

        product.name = name;
        product.price = price;
        product.quantity = quantity;

        await productsRepository.save(product);

        return product;
    }
}

export default UpdateProductService; 