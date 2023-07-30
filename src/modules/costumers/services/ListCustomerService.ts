import { getCustomRepository } from "typeorm";
import CustomersRepository from "../typeorm/repositories/CustomersRepository";
import AppError from "@shared/errors/AppError";
import Customer from "../typeorm/entities/Customer";

class ListCustomerService {
    public async execute(): Promise<Customer[]> {
        const customerRepository = getCustomRepository(CustomersRepository);

        const customer = customerRepository.find(); //preparando objeto para o banco de dados

        return customer;
    }
}

export default ListCustomerService; 