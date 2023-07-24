import { getCustomRepository } from "typeorm";
import { ProductRepository } from "../typeorm/repositories/ProcductsRepository";
import AppError from "@shared/errors/AppError";
import Product from "../typeorm/entities/product";

interface IRequest {
    id: string;
}

class DeleteProductService {
    public async execute({ id }: IRequest): Promise<void> {
        const productsRepository = getCustomRepository(ProductRepository);

        const product = await productsRepository.findOne(id); //procurando o produto no banco
        if (!product) throw new AppError('Produto não encontrado');

        await productsRepository.remove(product);
    }
}

export default DeleteProductService; 