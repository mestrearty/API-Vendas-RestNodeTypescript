import AppError from '@shared/errors/AppError';
import { Response, NextFunction, Request } from 'express';
import { verify } from 'jsonwebtoken';
import authConfig from '@config/auth';

interface ITokenPayload {
    iat: number;
    exp: number;
    sub: string;
}

//middleware que verifica se usuário está autenticado
export default function isAuthenticated(request: Request, response: Response, next: NextFunction): void {
    const authHeader = request.headers.authorization; //pega o token

    if (!authHeader) throw new AppError('JWT Token não enviado');//se não tiver token manda embora

    //o token tem um "Bearer" + espaço + "token" ex: "Bearer d3454w6546e5dasudasuaa024ia0sd"
    const [, token] = authHeader.split(' ');
    try {
        const decodedToken = verify(token, authConfig.jwt.secret);
        const { sub } = decodedToken as ITokenPayload; //pegando o id do usuário no token e armazenando na variável sub 

        request.user = {
            id: sub
        };

        return next();
    } catch {
        throw new AppError('Token JWT Inválido');
    }
}