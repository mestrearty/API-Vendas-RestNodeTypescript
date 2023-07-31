import { getCustomRepository } from "typeorm";
import ProductsRepository from "../typeorm/repositories/ProcductsRepository";
import AppError from "@shared/errors/AppError";
import Product from "../typeorm/entities/product";
import RedisCache from '@shared/cache/RedisCache';

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

        const redisCache = new RedisCache();

        const product = productsRepository.create({ name, price, quantity });
        
        await redisCache.invalidate('api-vendas-PRODUCT_LIST');

        await productsRepository.save(product);
        return product;
    }
}

export default CreateProductService;