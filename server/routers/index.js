import express from 'express';
import articles from './articles';
import auth from './auth';

const routers = new express.Router();

routers.route('/').get((request, response) => response.status(400).send({
  status: response.statusCode,
  message: 'Bad Request Error',
}));

routers.use(articles); 
routers.use(auth);

export default routers;