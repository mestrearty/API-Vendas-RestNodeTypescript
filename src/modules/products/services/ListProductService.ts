import { getCustomRepository } from "typeorm";
import ProductsRepository from "../typeorm/repositories/ProcductsRepository";
import AppError from "@shared/errors/AppError";
import Product from "../typeorm/entities/product";

class ListProductService {
    public async execute(): Promise<Product[]> {
        const productsRepository = getCustomRepository(ProductsRepository);

        const products = productsRepository.find(); //preparando objeto para o banco de dados

        return products;
    }
}

export default ListProductService; 