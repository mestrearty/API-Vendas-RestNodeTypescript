import { getCustomRepository } from "typeorm";
import CustomersRepository from "../typeorm/repositories/CustomersRepository";
import AppError from "@shared/errors/AppError";
import Customer from "../typeorm/entities/Customer";


interface IRequest {
    name: string;
    email: string;
}
class CreateCustomerService {
    public async execute({ name, email }: IRequest): Promise<Customer> {
        
        const customersRepository = getCustomRepository(CustomersRepository);
        const emailExists = await customersRepository.findByEmail(email);

        console.log({ emailExists });
        if (emailExists) throw new AppError('Já existe um usuário cadastrado com esse email');

        const costumer = customersRepository.create({ name, email }); //preparando objeto para o banco de dados

        await customersRepository.save(costumer);
        return costumer;
    }
}

export default CreateCustomerService;