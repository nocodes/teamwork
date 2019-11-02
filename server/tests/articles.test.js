import chai from 'chai';
import chaiHttp from 'chai-http';
import chaiThings from 'chai-things';
import { describe } from 'mocha';
import server from '../../index';

chai.should();
chai.use(chaiThings);
chai.use(chaiHttp);

