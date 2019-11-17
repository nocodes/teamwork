import express from 'express';
import validation from '../middlewares/SchemaValidator';
import GifsController from '../controllers/GifsController';
import Auth from '../middlewares/auth';

const gifs = new express.Router();
gifs.use(Auth.verifyToken);
gifs.use(validation);
// Gifs APIs
gifs.route('/gifs').post(GifsController.store); //add cloudinary
gifs.route('/gifs/:gifId').delete(GifsController.destroy);
gifs.route('/gifs/:gifId').get();
gifs.route('/gifs/:gifId/comments').post(GifsController.addComment);

export default gifs; 