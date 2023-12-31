import { getCustomRepository } from "typeorm";
import ProductsRepository from "../typeorm/repositories/ProcductsRepository";
import AppError from "@shared/errors/AppError";
import Product from "../typeorm/entities/product";
import redisCache from '@shared/cache/RedisCache';

class ListProductService {
    public async execute(): Promise<Product[]> {
        const productsRepository = getCustomRepository(ProductsRepository);

        let products = await redisCache.recover<Product[]>(
            'api-vendas-PRODUCT_LIST',
        );

        if (!products) {
            products = await productsRepository.find();

            await redisCache.save('api-vendas-PRODUCT_LIST', products);
        }
        return products;
    }
}

export default ListProductService; 