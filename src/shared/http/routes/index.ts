import { Router } from "express";

const routes = Router();

routes.get(`/`, (request, response) => {
    return response.json({ mensage: "Pokémon topster" });
});

export default routes;