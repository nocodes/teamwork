import express from 'express';


const auth = new express.Router();

auth.route('/auth/signup/').post();
auth.route('/auth/signin/').post();

export default auth;