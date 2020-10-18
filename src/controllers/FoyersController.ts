
import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import foyersView from '../views/foyers_view';
import * as Yup from 'yup';

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

        const data = {
            name,
            latitude,
            longitude, 
            about,
            instructions,
            opening_hours,
            open_on_weekends : open_on_weekends === 'true',
            images
			};
				
	    const schema = Yup.object().shape({
            name: Yup.string().required('Le nom est obligatoire'),
            latitude: Yup.number().required(),
            longitude: Yup.number().required(),
            about: Yup.string().required().max(300),
            instructions: Yup.string().required(),
            opening_hours: Yup.string().required(),
            open_on_weekends: Yup.boolean().required(),
            images: 
                Yup.array(Yup.object().shape({
                    path: Yup.string().required(),
                })
            )
        });
             		
		await schema.validate(data, {
			abortEarly: false,
		});

        const foyer = foyersRepository.create(data)
        
        await foyersRepository.save(foyer);
    
        return response.status(201).json(foyer); 
    }
};