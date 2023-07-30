import { Router } from "express";
import productsRouter from "./products.routes";
import usersRouter from "./users.routes";
import sessionsRouter from "./sessions.routes";
import passwordRouter from "./password.routes";
import profileRouter from "./profile.routes";
import customersRouter from "./customers.routes";

const routes = Router();

routes.use('/products', productsRouter);
routes.use('/user', usersRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/password', passwordRouter);
routes.use(`/profile`, profileRouter);
routes.use(`/customers`, customersRouter);

routes.get(`/`, (request, response) => {
    return response.json({ mensage: "Pokémon topster" });
});

export default routes;