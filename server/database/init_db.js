import { CreateEmployeesTable, CreateArticlesTable, CreateGifsTable,  CreateCategoriesTable, CreateCommentsTable } from './migrations';

const InitDB = async () => {
  await CreateEmployeesTable.run();
  await CreateArticlesTable.run();
  await CreateGifsTable.run();
  await CreateCategoriesTable.run();
  await CreateCommentsTable.run();
};

module.exports = InitDB;

require('make-runnable');  