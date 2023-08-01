import { getRepository, Repository } from "typeorm";
import Customer from "../entities/Customer";
import { ICustomersRepository } from '../../../domain/repositories/ICustomersRepository';
import { ICreateCustomer } from "@modules/customers/domain/models/ICreateCustomer";

class CustomersRepository implements ICustomersRepository {
    private ormRepository: Repository<Customer>;

    constructor() {
        this.ormRepository = getRepository(Customer);
    }

    public async findByName(name: string): Promise<Customer | undefined> {
        const customer = await this.ormRepository.findOne({
            where: {
                name,
            }
        });
        return customer;
    }

    public async findById(id: string): Promise<Customer | undefined> {
        const customer = await this.ormRepository.findOne({
            where: {
                id,
            }
        });
        return customer;
    }
    public async findByEmail(email: string): Promise<Customer | undefined> {
        const customer = await this.ormRepository.findOne({
            where: {
                email,
            }
        });
        return customer;
    }

    public async create({ name, email }: ICreateCustomer): Promise<Customer> {
        const customer = this.ormRepository.create({ name, email });
        this.ormRepository.save(customer);

        return customer;
    }

    public async save(customer: Customer): Promise<Customer> {
        this.ormRepository.save(customer);

        return customer;
    }
    public async remove(customer: Customer): Promise<void> {
        this.ormRepository.remove(customer);
    }
}

export default CustomersRepository;