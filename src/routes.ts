import { Router } from 'express';
import { getRepository } from 'typeorm';
import Foyer from './models/Foyer';


const routes = Router();

routes.post('/foyers', async (request, response) => {
    const {
        name,
        latitude,
        longitude, 
        about,
        instructions,
        opening_hours,
        open_on_weekends,
    } = request.body;

    const foyersRepository = getRepository(Foyer);

    const foyer = foyersRepository.create({
        name,
        latitude,
        longitude, 
        about,
        instructions,
        opening_hours,
        open_on_weekends,
    });

    await foyersRepository.save(foyer);

    return response.status(201).json (foyer);
});

export default routes;