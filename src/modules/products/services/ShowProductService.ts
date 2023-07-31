import { getCustomRepository } from "typeorm";
import ProductsRepository from "../infra/typeorm/repositories/ProcductsRepository";
import AppError from "@shared/errors/AppError";
import Product from "../infra/typeorm/entities/product";

interface IRequest {
    id: string;
}

class ShowProductService {
    public async execute({ id }: IRequest): Promise<Product | undefined> {
        const productsRepository = getCustomRepository(ProductsRepository);

        const product = await productsRepository.findOne(id); //procurando o produto no banco
        if (!product) throw new AppError('Produto não encontrado');

        return product;
    }
}

export default ShowProductService; 