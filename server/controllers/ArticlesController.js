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
      'title': storerows[0].title
    });
  }

}

export default ArticlesController;