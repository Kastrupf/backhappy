import Foyer from "../models/Foyer";
import imagesView from "./images_view";


export default {
  render(foyer : Foyer) {
		return {
			id: foyer.id,
    	name: foyer.name,
    	latitude: foyer.latitude,
    	longitude: foyer.longitude,
    	about: foyer.about,
    	instructions: foyer.instructions,
    	opening_hours: foyer.opening_hours,
			open_on_weekends: foyer.open_on_weekends,
			images: imagesView.renderMany(foyer.images)
  	};
	},

	renderMany(foyers : Foyer[]) {
		return foyers.map(foyer => this.render(foyer));
  }
};