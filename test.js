const chai = require('chai');
const expect = require('chai').expect;

chai.use(require('chai-http'));

const app = require('./index.js'); // Our app


describe('API endpoint ', function() {
 
//should return all users

  it('should return all users', function() {
    return chai.request('http://127.0.0.1:8080')
      .get('/api/v1/users/')
      .then(function(res) {
      	expect(res).to.have.status(200);
        expect(res).to.be.json;
      });
  });

//should return all parcels

  it('should return all parcel', function() {
    return chai.request('http://127.0.0.1:8080')
      .get('/api/v1/parcels/')
      .then(function(res) {
      	expect(res).to.have.status(200);
        expect(res).to.be.json;
      });
  });

//create new parcel delivery order


 it('should add new parcel delivery order', function() {
    return chai.request('http://127.0.0.1:8080')
      .post('/api/v1/parcels/')
      .send({"user_id":1,"parcel_name":"Ikarito","price":5000,"distance":"3km","duration":"1min","pickup_address":"kigali nyamirambo","destination_address":"kigali gatenga","pickup_lat":-9.898938,"pickup_long":1.898938,"destination_lat":-6.898938,"destination_long":0.898938,"present_address":"Kigali gakinjiro","present_long":-9.898938,"present_lat":1.898938,"status":"transit"})
      .then(function(res) {
        expect(res).to.have.status(200);
        expect(res).to.be.json;
      });
  });

 
});