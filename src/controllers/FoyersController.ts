
import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import foyersView from '../views/foyers_view';

import Foyer from '../models/Foyer';


export default {

    async index(request: Request, response: Response) {
        const foyersRepository = getRepository(Foyer);

        const foyers = await foyersRepository.find({
            relations: ['images']
        });

        return response.json(foyersView.renderMany(foyers));
    },

    async show(request: Request, response: Response) {
        const { id } = request.params;

        const foyersRepository = getRepository(Foyer);

        const foyer = await foyersRepository.findOneOrFail(id, {
            relations: ['images'] 
        });

        return response.json(foyersView.render(foyer));
    },

    async create(request: Request, response: Response) {
        // console.log(request.files);
        
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

        const requestImages = request.files as Express.Multer.File[];
        const images = requestImages.map(image => {
            return { path: image.filename }
        });
    
        const foyer = foyersRepository.create({
            name,
            latitude,
            longitude, 
            about,
            instructions,
            opening_hours,
            open_on_weekends,
            images
        });
    
        await foyersRepository.save(foyer);
    
        return response.status(201).json (foyer); 
     
    }
}