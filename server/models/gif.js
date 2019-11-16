import Database from '../database/database';

class Gif extends Database {
  constructor() {
    super('gifa');
  }

  async getById(id) {
    return await this.first('id', '=', id);
  }

  async getByAuthor(id) {
    return await this.where('authorId', '=', id);
  }

  async all(orderBy = 'createdOn DESC') {
    return super.all(orderBy);
  }
}

export default Gif;