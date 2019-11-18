import moment from 'moment';
import Helpers from '../helpers/Helpers';
import { Gif } from '../models';


const Model = new Gif();

class GifsController {
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
      'message' : 'Gif image successfully posted',
      'gifId' : store.rows[0].id,
      'createdOn' : moment().format('YYYY-MM-DD HH:mm:ss'),
      'imageUrl': store.rows[0].imageUrl,
      'title': store.rows[0].title
    });
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
        'message' : 'gif post successfully deleted'});
    }
    return Helpers.sendFailedResponse(response, 404, 'Gif Not Found !!');
  }

  static async addComment(request, response) {
    const commentModel = new Comment();
    const { user } = request;
    const { comment } = request.body;
    const { gifId } = request.params;
    const article = await Model.getById(gifId);
    const data = {
      comment,
      gif_id: parseInt(gifId),
      employee_id: user.id,
      createdOn: moment()
        .format('YYYY-MM-DD HH:mm:ss'),
    };
    const save = await commentModel.create(data);
    if (save.errors) Helpers.dbError(response, save);
    return Helpers.sendResponse(response, 201, { 
      'message' : 'comment successfully created',
      'gifTitle' : gif.row.title,
      'createdOn' : data.createdOn,
      'comment': comment
    });
  }

  static async findOne(request, response) {
    const { articleId } = request.params;
    const result = await Model.getById(gifId);
    if (result.errors) return Helpers.dbError(response, result);
    if (result.count > 0) {
      return Helpers.sendResponse(response, 200, { 
        'id': result.row.id,
        'url' : result.row.url,
        'title' : result.row.title,
        'createdOn' : result.row.createdOn,
        'comments': [] //add comments later
      });
    }
    return Helpers.sendFailedResponse(response, 404, 'Gif not found !');
  }

}

export default GifsController;