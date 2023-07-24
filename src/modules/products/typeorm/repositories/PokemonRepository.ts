import { EntityRepository, Repository } from "typeorm";
import Pokemon from "../entities/pokemon";

@EntityRepository(Pokemon)
export class ProductRepository extends Repository<Pokemon> {
    public async findByName(name: string): Promise<Pokemon | undefined> {
        const pokemon = this.findOne({
            where: {
                name
            }
        });

        return pokemon;
    }
}