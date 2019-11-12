import Helpers from '../helpers/Helpers';
import { User } from '../models';

const user = new User();

class UserController {
  static async createUser(request, response) {
    const data = request.body;
    data.password = Helpers.hashPassword(request.body.password);
    const checkEmail = await user.getByEmail(data.email);
    if (checkEmail.errors) return Helpers.dbError(response, checkEmail);
    if (checkEmail.count > 0) return Helpers.sendFailedResponse(response, 409, 'Email already exists !');
    const saveUser = await user.create(data);
    if (saveUser.errors) return Helpers.dbError(response, saveUser);
    const token = Helpers.generateToken(saveUser.rows[0].id);
    return Helpers.sendResponse(response, 201, 
    { 
      'message' : 'User account successfully created',
      'token' : token,
      'userId' : saveUser.rows[0].id
    });
  }
  
}

export default UserController; 