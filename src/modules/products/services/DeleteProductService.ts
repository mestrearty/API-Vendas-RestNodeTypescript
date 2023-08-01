import { getCustomRepository } from "typeorm";
import ProductsRepository from "../typeorm/repositories/ProcductsRepository";
import AppError from "@shared/errors/AppError";
import Product from "../typeorm/entities/product";
import redisCache from '@shared/cache/RedisCache';

interface IRequest {
    id: string;
}

class DeleteProductService {
    public async execute({ id }: IRequest): Promise<void> {
        const productsRepository = getCustomRepository(ProductsRepository);

        const product = await productsRepository.findOne(id); //procurando o produto no banco
        if (!product) throw new AppError('Produto não encontrado');

        await redisCache.invalidate('api-vendas-PRODUCT_LIST');
        
        await productsRepository.remove(product);
    }
}

export default DeleteProductService; 