import express from 'express';
import validation from '../middlewares/SchemaValidator';

const gifs = new express.Router();
gifs.use(Auth.verifyToken);
// Gifs APIs
gifs.route('/gifs').post();
gifs.route('/gifs/:gifId').delete();
gifs.route('/gifs/:gifId').get();
gifs.route('/gifs/:gifId/comments').post();

export default gifs;