import { getCustomRepository } from "typeorm";
import CustomersRepository from "../typeorm/repositories/CustomersRepository";
import AppError from "@shared/errors/AppError";
import Customer from "../typeorm/entities/Customer";

class ListCustomerService {
    public async execute(): Promise<Customer[]> {
        const customerRepository = getCustomRepository(CustomersRepository);

        const customer = await customerRepository.find(); 

        return customer;
    }
}

export default ListCustomerService; 