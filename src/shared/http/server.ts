import 'reflect-metadata';
import 'dotenv/config';
import express, { Response, Request, NextFunction } from 'express';
import 'express-async-errors';
import cors from 'cors';
import { errors } from 'celebrate';
import routes from './routes';
import AppError from '@shared/errors/AppError';
import '@shared/typeorm';
import uploadConfig from '@config/upload';


const app = express();
const port = process.env.SERVER_PORT;

app.use(cors());
app.use(express.json());
app.use('/files', express.static(uploadConfig.directory)); //Rota para front-end consumir imagens dee avatar do usuário

//middlewares
app.use(routes); //gerenciador de rotas
app.use(errors()); // validador de erros pelo celebrate

//Esposta em caso de erro de requisição
app.use((error: Error, request: Request, response: Response, next: NextFunction) => {
  if (error instanceof AppError) {
    return response.status(error.statusCode).json({
      status: 'error',
      message: error.message
    });
  }

  return response.status(500).json({
    status: 'error',
    message: "Internal server error"
  });
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});


