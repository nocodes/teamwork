import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

class Helpers {
  static hashPassword(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
  }

  static comparePassword(hashPassword, password) {
    return bcrypt.compareSync(password, hashPassword);
  }

  static generateToken(userId) {
    return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '1h' });
  }

  static validationResponse(validation, response) {
    if (validation.error != null) {
      const errors = [];
      for (let index = 0; index < validation.error.details.length; index++) {
        errors.push(validation.error.details[index].message.split('"')
          .join(''));
      }
      return response.status(422)
        .send({
          status: 'error',
          error: errors,
        });
    }
  }

  static sendResponse(response, codeStatus, data = undefined) {
    const res = {
      status: 'success',
    };
    if (data !== undefined) {
      res.data = data;
    }
    return response.status(codeStatus).send(res);
  }

  static sendFailedResponse(response, codeStatus, message) {
    const res = {
      status: 'error',
      error: message
    };
    return response.status(codeStatus).send(res);
  }

  static dbError(response, query) {
    if (query.errors) {
      console.log(query.errors);
      return Helpers.sendFailedResponse(response, 501, 'Oops Something went wrong.');
    }
  }
}

export default Helpers;