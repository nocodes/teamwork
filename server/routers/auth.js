import express from 'express';


const auth = new express.Router();

auth.route('/auth/create-user/').post();
auth.route('/auth/signin/').post();

export default auth;