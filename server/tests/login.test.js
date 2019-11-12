import chai from 'chai';
import chaiThings from 'chai-things';
import chaiHttp from 'chai-http';
import server from '../../index';

chai.should();
chai.use(chaiThings);
chai.use(chaiHttp);

describe('User Authentication', () => {
  it('should return error for empty field', (done) => {
    const data = {};
    chai.request(server)
      .post('/api/v1/auth/signin/')
      .send(data)
      .end((request, response) => {
        response.body.should.have.property('status')
          .equal('error');
        response.body.should.have.property('error')
          .equal('Field empty');
      });
    done();
  });

  it('should return error for invalid credentials', (done) => {
    const data = {
      email: 'bolaji@gmail.com',
      password: 'qwerty',
    };
    chai.request(server)
      .post('/api/v1/auth/signin/')
      .send(data)
      .end((request, response) => {
        response.body.should.have.property('status')
          .equal('error');
        response.body.should.have.property('error')
          .equal('Invalid credentials');
      });
    done();
  });

  it('should return success for valid credentials', (done) => {
    const data = {
      email: 'bolaji@gmail.com',
      password: 'password',
    };
    chai.request(server)
      .post('/api/v1/auth/signin/')
      .send(data)
      .end((request, response) => {
        response.body.should.have.property('status')
          .equal('success');
        response.body.data.should.be.an('Object');
        response.body.data.should.have.property('token');
        response.body.data.should.have.property('userID');
      });
    done();
  });
});
