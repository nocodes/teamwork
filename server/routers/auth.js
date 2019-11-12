import express from 'express';
import UserController from '../controllers/UserController';
import validation from '../middlewares/SchemaValidator';


const auth = new express.Router();

auth.use(validation);
auth.route('/auth/create-user/').post(UserController.createUser);
auth.route('/auth/signin/').post(UserController.signIn);

export default auth;  