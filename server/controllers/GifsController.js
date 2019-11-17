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

}

export default GifsController;