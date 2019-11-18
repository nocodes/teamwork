import moment from 'moment';
import Helpers from '../helpers/Helpers';
import { Article, Gif, Comment } from '../models';
import { articles } from '../mock';

const Model = new Article();
const Model_1 = new Gif();

class ArticlesController {
  static async store(request, response) {
    const { user } = request;
    const data = {
      ...request.body,
      authorId: user.id,
      createdOn: moment().format('YYYY-MM-DD HH:mm:ss'),
    };
    const store = await Model.create(data);
    if (store.errors) Helpers.dbError(response, store);
    return Helpers.sendResponse(response, 201,  { 
      'message' : 'Article successfully posted',
      'articleId' : store.rows[0].id,
      'createdOn' : moment().format('YYYY-MM-DD HH:mm:ss'),
      'title': store.rows[0].title
    });
  }

  static async update(request, response) {
    const { articleId } = request.params;
    const { user } = request;
    const data = {
      ...request.body,
      updatedOn: moment().format('YYYY-MM-DD HH:mm:ss'),
    };
    const update = await Model.update(data, {
      authorId: user.id,
      id: articleId,
    });
    if (update.errors) return Helpers.dbError(response, update);
    if (update.count > 0) {
      return Helpers.sendResponse(response, 200,  { 
        'message' : 'Article successfully updated',
        'article' : update.rows[0],
        'title': update.rows[0].title
      });
    }
    return Helpers.sendFailedResponse(response, 404, 'Article no found !');
  }

  static async destroy(request, response) {
    const { articleId } = request.params;
    const { user } = request;
    const destroy = await Model.delete({
      authorId: user.id,
      id: articleId,
    });
    if (destroy.errors) return Helpers.dbError(response, destroy);
    if (destroy.count > 0) {
      return Helpers.sendResponse(response, 204, { 
        'message' : 'Article successfully deleted'
      });
    }
    return Helpers.sendFailedResponse(response, 404, 'Article Not Found !!');
  }

  static async addComment(request, response) {
    const commentModel = new Comment();
    const { user } = request;
    const { comment } = request.body;
    const { articleId } = request.params;
    const article = await Model.getById(articleId);
    const data = {
      comment,
      article_id: parseInt(articleId),
      employee_id: user.id,
      createdOn: moment()
        .format('YYYY-MM-DD HH:mm:ss'),
    };
    const save = await commentModel.create(data);
    if (save.errors) Helpers.dbError(response, save);
    return Helpers.sendResponse(response, 201, { 
      'message' : 'Comment successfully created',
      'article' :article.row.article,
      'articleTitle' : article.row.title,
      'createdOn' : data.createdOn,
      'comment': comment
    });
  }

  static async findOne(request, response) {
    const { articleId } = request.params;
    const result = await Model.getById(articleId);
    if (result.errors) return Helpers.dbError(response, result);
    if (result.count > 0) {
      return Helpers.sendResponse(response, 200, { 
        'id': result.row.id,
        'article' : result.row.article,
        'title' : result.row.title,
        'createdOn' : result.row.createdOn,
        'comments': [] //add comments later
      });
    }
    return Helpers.sendFailedResponse(response, 404, 'Article not found !');
  }
 
  static async findAll(request, response) {
    const _articles = await Model.all();
    const _gifs = await Model_1.all();
    if (_articles.errors) Helpers.dbError(response, _articles);
    if (_gifs.errors) Helpers.dbError(response, _gifs);
    return Helpers.sendResponse(response, 200, [
      _articles.rows, _gifs.rows //work on find all
    ]) 
  }

  static async findByCategory(request, response) {
    const { tagId } = request.params;
    const categoryModel = new Category(tagId);
    const results = await categoryModel.articles();
    if (results.errors) return Helpers.dbError(response, results);
    if (results.count < 1) return Helpers.sendFailedResponse(response, 404, 'No articles found !');
    return Helpers.sendResponse(response, 200, { 
      'message' : 'Successfully found articles by tag',
      'article' : results.rows
    });
  }
  
  static async findByAuthor(request, response) {
    const { authorId } = request.params;
    const results = await Model.getByAuthor(authorId);
    if (results.errors) return Helpers.dbError(response, results);
    if (results.count <= 0) {
      return Helpers.sendFailedResponse(response, 404, 'No articles found !', []);
    }
    return Helpers.sendResponse(response, 200, { 
      'message' : 'Successfully found articles by author',
      'article' : results.rows
    });
  }
}

export default ArticlesController;