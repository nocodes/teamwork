import moment from 'moment';
import Helpers from '../helpers/Helpers';
import { Article, Category, Comment } from '../models';
import { articles } from '../mock';

const Model = new Article();

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

}

export default ArticlesController;