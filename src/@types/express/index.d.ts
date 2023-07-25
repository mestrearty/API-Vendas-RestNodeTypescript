//sobrescrevendo o método Request do Express para que possa armazenar
//o ID do usuário retornado no JWD_Token no Request

declare namespace Express {
    export interface Request {
        user: {
            id: string;
        };
    }
}