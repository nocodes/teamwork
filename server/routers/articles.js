import express from 'express';
import validation from '../middlewares/SchemaValidator';
import ArticlesController from '../controllers/ArticlesController';
import Auth from '../middlewares/auth';

const articles = new express.Router();
articles.use(Auth.verifyToken);
articles.use(validation);
// Articles APIs
articles.route('/feeds').get();
articles.route('/articles').post(articlesController.store);
articles.route('/articles/:articleId').get();
articles.route('/articles/:articleId').delete();
articles.route('/articles/:articleId/comments').post();
articles.route('/articles/:articleId').patch();
articles.route('/feeds/:tagId/tags').get();
articles.route('/author/articles/:authorId').get();

export default articles;