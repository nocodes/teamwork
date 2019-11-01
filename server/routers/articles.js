import express from 'express';


const articles = new express.Router();
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