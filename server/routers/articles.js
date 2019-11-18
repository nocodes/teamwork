import express from 'express';
import validation from '../middlewares/SchemaValidator';
import ArticlesController from '../controllers/ArticlesController';
import Auth from '../middlewares/auth';

const articles = new express.Router();
articles.use(Auth.verifyToken);
articles.use(validation);
// Articles APIs.
articles.route('/feeds').get(ArticlesController.findAll);
articles.route('/articles').post(ArticlesController.store);
articles.route('/articles/:articleId').get(ArticlesController.findOne);
articles.route('/articles/:articleId').delete(ArticlesController.destroy);
articles.route('/articles/:articleId/comments').post(ArticlesController.addComment);
articles.route('/articles/:articleId').patch(ArticlesController.update);
articles.route('/feeds/:tagId/tags').get(ArticlesController.findByCategory);
articles.route('/author/articles/:authorId').get(ArticlesController.findByAuthor);

export default articles; 