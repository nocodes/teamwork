import chai from 'chai';
import chaiHttp from 'chai-http';
import chaiThings from 'chai-things';
import { describe } from 'mocha';
import server from '../../index';

chai.should();
chai.use(chaiThings);
chai.use(chaiHttp);

describe('Create user account endpoint', () => {
  it('should return error for empty fields', (done) => {
    const data = {};
    chai.request(server)
      .post('/api/v1/auth/create-user')
      .send(data)
      .end((request, response) => {
        response.body.should.have.property('status')
          .equal('error');
        response.body.should.have.property('error')
          .equal('Field empty');
      });
    done();
  });

  it('should return success for valid entry', (done) => {
    const data = {
      firstName: 'bolaji',
      lastName: 'akande',
      email: 'bolaji@gmail.com',
      password: 'password',
      gender: 'male',
      jobRole: 'developer',
      department: 'Software developer',
      address: 'Lagos-Ikeja',
    };
    chai.request(server)
      .post('/api/v1/auth/create-user')
      .send(data)
      .end((request, response) => {
        response.body.should.have.property('status')
          .equal('success');
        response.body.should.have.property('data');
        response.body.data.should.be.an('Object');
        response.body.data.should.have.property('token');
        response.body.data.should.have.property('userID');
        response.body.data.should.have.property('message')
          .equal('User account successfully created');
      });
    done();
  });

  it('should return error for existing email', (done) => {
    const data = {
      firstName: 'bolaji',
      lastName: 'akande',
      email: 'bolaji@gmail.com',
      password: 'password',
      gender: 'male',
      jobRole: 'developer',
      department: 'Software developer',
      address: 'Lagos-Ikeja',
    };
    chai.request(server)
      .post('/api/v1/auth/create-user')
      .send(data)
      .end((request, response) => {
        response.body.should.have.property('status')
          .equal('error');
        response.body.should.have.property('error')
          .equal('Email already exists !');
      });
    done();
  });
});