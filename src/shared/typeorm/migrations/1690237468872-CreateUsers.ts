import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateUsers1690237468872 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}

//Arquivo gerado através de "yarn typeorm migration:create -n <Nome_do_Arquivo_sem_numeros>"