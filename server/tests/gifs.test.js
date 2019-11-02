import chai from 'chai';
import chaiHttp from 'chai-http';
import chaiThings from 'chai-things';
import { describe } from 'mocha';
import server from '../../index';
import { users, auth, gifs } from '../mock';

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

describe('gifs endpoint tests', () => {
  it('Should fail to create an gif ', (done) => {
    const data = {};
    chai.request(server)
      .post('/api/v1/gifs')
      .send(data)
      .set('token', token)
      .end((request, response) => {
        response.body.should.have.property('status')
          .equal('error');
        response.body.should.have.property('status')
          .equal('Field is empty');
      });
    done();
  });
  it('Should fail to create an gif due to database issues ', (done) => {
    const data = { ...gifs[1] };
    chai.request(server)
      .post('/api/v1/gifs')
      .send(data)
      .set('token', token)
      .end((request, response) => {
        response.body.should.have.property('status')
          .equal('error');
        response.body.should.have.property('error')
          .equal('Failed due to internal error'); 
      });
    done();
  });
  it('should create a gif', (done) => {
    const data = {
      title: 'Eget duis at tellus at urna condimentum mattis pellentesque id',
      //todo - image should be gif
      image: 'https://images.unsplash.com/photo-1568685002001-1017b6b99e44?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=610&q=80'
    };
    chai.request(server)
      .post('/api/v1/gifs')
      .send(data)
      .set('token', token)
      .end((request, response) => {
        response.body.should.have.property('status')
          .equal('success');
        response.body.should.have.property('data');
        response.body.data.should.be.an('Object');
        response.body.data.should.have.property('message')
          .equal('GIF image successfully posted”');
        response.body.data.should.have.property('gifId');
        response.body.data.should.have.property('createdOn');
        response.body.data.should.have.property('title')
          .equal(data.title);
        response.body.data.should.have.property('imageUrl')
          .equal(data.image);
      });
    done();
  });

  it('should not find gif', (done) => {
    const gifID = -1;
    chai.request(server)
      .get(`/api/v1/gifs/${gifID}`)
      .set('token', token)
      .end((request, response) => {
        response.body.should.have.property('status')
          .equal('error');
        response.body.should.have.property('error')
          .equal('GIF not found !');
      });
    done();
  });

  it('should find gif', (done) => {
    const gifID = 1;
    chai.request(server)
      .get(`/api/v1/gifs/${gifID}`)
      .set('token', token)
      .end((request, response) => {
         response.body.should.have.property('status')
          .equal('success');
        response.body.should.have.property('data');
        response.body.data.should.be.an('Object');
        response.body.data.should.have.property('id');
        response.body.data.should.have.property('createdOn');
        response.body.data.should.have.property('title');
        response.body.data.should.have.property('url');
        response.body.data.comments.should.be.an('Array');
      });
    done();
  });


   it('should delete gif', (done) => {
    const gifID = 1;
    chai.request(server)
      .delete(`/api/v1/gifs/${gifID}`)
      .set('token', token)
      .end((request, response) => {
         response.body.should.have.property('status')
          .equal('success');
        response.body.data.should.have.property('message')
          .equal('gif post successfully deleted');
      });
    done();
  });

  it('should fail to delete gif', (done) => {
    const gifID = 9;
    chai.request(server)
      .delete(`/api/v1/gifs/${gifID}`)
      .set('token', token)
      .end((request, response) => {
        response.body.should.have.property('status')
          .equal('error');
        response.body.should.have.property('error')
          .equal('gif Not Found !!');
      });
    done();
  });

  it('should fail to add comment', (done) => {
    const comment = '';
    const gifId = 4;
    chai.request(server)
      .post(`/api/v1/gifs/${gifId}/comments`)
      .set('token', token)
      .send({ comment })
      .end((request, response) => {
        response.body.should.have.property('status')
          .equal('error');
        response.body.should.have.property('error')
          .equal('Field is empty');
      });
    done();
  });

  it('should add a comment', (done) => {
    const comment = 'this is what i used to say to people and didn\'t believe me !!';
    const gifId = 1;
    chai.request(server)
      .post(`/api/v1/gifs/${gifId}/comments`)
      .set('token', token)
      .send({ comment })
      .end((request, response) => {
        response.body.should.have.property('status')
          .equal('success');
        response.body.data.should.have.property('message').equal('comment successfully added.');
        response.body.data.should.have.property('comment').equal(comment);
        response.body.data.should.have.property('gifTitle');
      });
    done();
  });

  it('should not find gif with wrong tag', () => {
    const tagId = 100;
    chai.request(server)
      .get(`/api/v1/feeds/${tagId}/tags`)
      .set('token', token)
      .set('Accept', 'application/json')
      .end((request, response) => {
        response.body.should.have.property('status')
          .equal('error');
        response.body.should.have.property('error')
          .equal('No gifs found !');
      });
  });

  it('should find gifs by tag', () => {
    const tagId = 1;
    chai.request(server)
      .get(`/api/v1/feeds/${tagId}/tags`)
      .set('token', token)
      .end((request, response) => {
        response.body.should.have.property('status')
          .equal('success');
        response.body.data.should.have.property('message')
          .equal('Successfully found gifs by tag');
        response.body.data.should.be.an('Array');
      });
  });

  it('should not find gif by wrong author', () => {
    const authorId = 0;
    chai.request(server)
      .get(`/api/v1/author/gifs/${authorId}`)
      .set('token', token)
      .end((request, response) => {
        response.body.should.have.property('status')
          .equal('error');
        response.body.should.have.property('error')
          .equal('No gifs found !');
      });
  });

  it('should find gifs by author', () => {
    const authorId = 1;
    chai.request(server)
      .get(`/api/v1/author/gifs/${authorId}`)
      .set('token', token)
      .end((request, response) => {
        response.body.should.have.property('status')
          .equal('success');
        response.body.data.should.have.property('message')
          .equal('Successfully found gifs by author');
        response.body.data.should.be.an('Array');
      });
  });
});

