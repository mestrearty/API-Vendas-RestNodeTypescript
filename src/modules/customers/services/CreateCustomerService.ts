import AppError from "@shared/errors/AppError";
import { ICreateCustomer } from "../domain/models/ICreateCustomer";
import { ICustomersRepository } from "../domain/repositories/ICustomersRepository";
import { ICustomer } from "../domain/models/ICustomer";
import { inject, injectable } from "tsyringe";

@injectable()
class CreateCustomerService {

    constructor(
        @inject('CustomersRepository')
        private customersRepository: ICustomersRepository) { }

    public async execute({ name, email }: ICreateCustomer): Promise<ICustomer> {
        const emailExists = await this.customersRepository.findByEmail(email);

        if (emailExists) throw new AppError('Já existe um usuário cadastrado com esse email');

        const costumer = await this.customersRepository.create({ name, email }); //preparando objeto para o banco de dados

        return costumer;
    }
}

export default CreateCustomerService;