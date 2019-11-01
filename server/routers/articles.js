import express from 'express';
import validation from '../middlewares/SchemaValidator';

const articles = new express.Router();
articles.use(Auth.verifyToken);
// Articles APIs
articles.route('/feeds').get();
articles.route('/articles').post();
articles.route('/articles/:articleId').get();
articles.route('/articles/:articleId').delete();
articles.route('/articles/:articleId/comments').post();
articles.route('/articles/:articleId').patch();
articles.route('/feeds/:tagId/tags').get();
articles.route('/author/articles/:authorId').get();

export default articles;