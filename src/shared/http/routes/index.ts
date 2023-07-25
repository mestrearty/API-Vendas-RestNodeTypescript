import { Router } from "express";
import productsRouter from "./products.routes";
import usersRouter from "./users.routes";

const routes = Router();

routes.use('/products', productsRouter);
routes.use('/user', usersRouter);

routes.get(`/`, (request, response) => {
    return response.json({ mensage: "Pokémon topster" });
});

export default routes;