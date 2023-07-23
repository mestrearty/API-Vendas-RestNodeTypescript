import express, { Response, Request, NextFunction } from 'express';
import cors from 'cors';
import routes from './routes';
import AppError from '@shared/errors/AppError';

const app = express();
const port = 9000;

app.use(cors());
app.use(express.json());

//middlewares
app.use(routes); //gerenciador de rotas

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
