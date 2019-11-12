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

  static async signIn(request, response) {
    const { email, password } = request.body;
    const _user = await user.getByEmail(email);
    Helpers.dbError(response, _user);
    if (_user.count > 0 && Helpers.comparePassword(_user.row.password, password)) {
      const token = Helpers.generateToken(_user.row.id);
      return Helpers.sendResponse(response, 200,   { 
        'token' : token,
        'userId' : _user.row.id
      });
    }
    return Helpers.sendFailedResponse(response, 400, 'Invalid credentials');
  } 
  
}

export default UserController;  