import { getCustomRepository } from "typeorm";
import CustomersRepository from "../typeorm/repositories/CustomersRepository";
import AppError from "@shared/errors/AppError";
import Customer from "../typeorm/entities/Customer";

interface IRequest {
    id: string;
}

class ShowCustomerService {
    public async execute({ id }: IRequest): Promise<Customer | undefined> {
        const customersRepository = getCustomRepository(CustomersRepository);

        const customer = await customersRepository.findOne(id); //procurando o produto no banco
        if (!customer) throw new AppError('Cliente não encontrado');

        return customer;
    }
}

export default ShowCustomerService; 