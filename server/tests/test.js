
import chai from 'chai';
import chaiHttp from 'chai-http';
import chaiThings from 'chai-things';
import { describe } from 'mocha';
import server from '../../index';


chai.should();
chai.use(chaiThings);
chai.use(chaiHttp);

describe('Endpoint prefix', () => {
  it('should return error for base route', (done) => {
    chai.request(server)
      .get('/api/v1/')
      .end((request, response) => {
        response.body.should.have.property('status')
          .equal('error');
        response.body.should.have.property('error')
          .equal('base route error');
      });
    done();
  });
});