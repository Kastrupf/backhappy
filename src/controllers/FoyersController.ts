
import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import Foyer from '../models/Foyer';


export default {

    async index(request: Request, response: Response) {
        const foyersRepository = getRepository(Foyer);

        const foyers = await foyersRepository.find();

        return response.json(foyers);
    },


    async create(request: Request, response: Response) {
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
     
    }
}