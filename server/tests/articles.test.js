import chai from 'chai';
import chaiHttp from 'chai-http';
import chaiThings from 'chai-things';
import { describe } from 'mocha';
import server from '../../index';
import { users, auth, articles } from '../mock';

chai.should();
chai.use(chaiThings);
chai.use(chaiHttp);

let { token } = auth;
before((done) => {
  const login = {
    email: users[0].email,
    password: users[0].textPassword,
  };

  chai.request(server)
    .post('/api/v1/auth/signin/')
    .send(login)
    .end((error, response) => {
      token = response.body.data.token;
    });
  done();
});

describe('Articles endpoint tests', () => {
  it('Should fail to create an article ', (done) => {
    const data = {};
    chai.request(server)
      .post('/api/v1/articles')
      .send(data)
      .set('token', token)
      .end((request, response) => {
        response.body.should.have.property('status')
          .equal('error');
      });
    done();
  });
  it('Should fail to create an article due to database issues ', (done) => {
    const data = { ...articles[1] };
    chai.request(server)
      .post('/api/v1/articles')
      .send(data)
      .set('token', token)
      .end((request, response) => {
        response.body.should.have.property('status')
          .equal('error'); 
      });
    done();
  });
  it('should create an article', (done) => {
    const data = {
      title: 'Eget duis at tellus at urna condimentum mattis pellentesque id',
      message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    };
    chai.request(server)
      .post('/api/v1/articles')
      .send(data)
      .set('token', token)
      .end((request, response) => {
        response.body.should.have.property('status')
          .equal('success');
        //response.body.should.have.property('message')
          //.equal('Article successfully created');
        response.body.should.have.property('data');
        response.body.data.should.be.an('Object');
        response.body.data.should.have.property('createdOn');
        response.body.data.should.have.property('title')
          .equal(data.title);
        response.body.data.should.have.property('image')
          .equal(data.image);
        response.body.data.should.have.property('article')
          .equal(data.article);
      });
    done();
  });

  it('should not find article', (done) => {
    const articleID = -1;
    chai.request(server)
      .get(`/api/v1/articles/${articleID}`)
      .set('token', token)
      .end((request, response) => {
        response.body.should.have.property('status')
          .equal('error');
        response.body.should.have.property('error')
          .equal('Article not found !');
      });
    done();
  });

  it('should find article', (done) => {
    const articleID = 1;
    chai.request(server)
      .get(`/api/v1/articles/${articleID}`)
      .set('token', token)
      .end((request, response) => {
        response.body.should.have.property('status')
          .equal('success');
        //response.body.should.have.property('message')
          //.equal('Article found !');
        response.body.should.have.property('data');
        response.body.data.should.be.an('Object');
      });
    done();
  });

  it('should get feeds', (done) => {
    chai.request(server)
      .get('/api/v1/feeds')
      .set('token', token)
      .end((request, response) => {
        response.body.should.have.property('status')
          .equal('success');
        //response.body.should.have.property('message')
          //.equal('Success');
        response.body.should.have.property('data');
      });
    done();
  });

