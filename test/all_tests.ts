import chai = require('chai');
import chaiHttp = require('chai-http');
import mocha = require('mocha');

let server = require('../dist/app');

let expect = chai.expect;
let should = chai.should;

chai.use(chaiHttp);

let errorConvert = (err) => {
    let text = JSON.parse(err.response.error.text);
    return text;
}

let user_id,shipment_id, token;

describe('Shipment', () => {
    it('create new shipment', (done) => {
        chai.request(server)
            .post('/shipment/create')
            .send({
                "shipmentId": "fe354543t4",
                "startShipmentTime": "453543",
                "buerCurrency": "nem:xem",
                "payment": 1,
                "goodsName": "nem:xem",
                "quantityOfGoods": 2,
                "endShipmentTime": "366555433",
                "buyerPrivateKeyName": "INITIATOR_PRIVATE",
                "sellerPublicKeyName": "SENSOR_TOTAL_MULTISIG_PUBLIC",
                "statusShipment": "start"
              })
            .end(function(err, res) {
                expect(res.body.result).to.be.equal('OK');
                expect(res.body.isError).to.be.false;
                expect(res).to.have.status(200);
               
                setTimeout(function(){
                    done();
                },10000);
            });
    });

    it('send confirm #1', (done) => {
        chai.request(server)
            .post('/shipment/confirm')
            .send({
                "multisigPrivateKeyName": "SENSOR_TOTAL_MULTISIG_PRIVATE",
                "cosignerPrivateKeyName": "SENSOR_TRAIN_DRIVER_MULTISIG_PRIVATE" // сенсор алкоголя
              })
            .end(function(err, res) {
                expect(res).to.have.status(200);
                setTimeout(function(){done();},5000);
            });
    });

    it('send confirm #2', (done) => {
        chai.request(server)
            .post('/shipment/confirm')
            .send({
                "multisigPrivateKeyName": "SENSOR_TOTAL_MULTISIG_PRIVATE",
                "cosignerPrivateKeyName": "SENSOR_DRIVE_PRIVATE" // 
              })
            .end(function(err, res) {
                expect(res).to.have.status(200);
                setTimeout(function(){done();},5000);
            });
    });

    it('send confirm #3', (done) => {
        chai.request(server)
            .post('/shipment/confirm')
            .send({
                "multisigPrivateKeyName": "SENSOR_TOTAL_MULTISIG_PRIVATE",
                "cosignerPrivateKeyName": "SENSOR_WEIGHT_PRIVATE" // 
              })
            .end(function(err, res) {
                expect(res).to.have.status(200);
                setTimeout(function(){done();},5000);
            });
    });

    it('send confirm #4', (done) => {
        chai.request(server)
            .post('/shipment/confirm')
            .send({
                "multisigPrivateKeyName": "SENSOR_TOTAL_MULTISIG_PRIVATE",
                "cosignerPrivateKeyName": "SENSOR_FINERPRINT_PRIVATE" // 
              })
            .end(function(err, res) {
                expect(res).to.have.status(200);
                setTimeout(function(){done();},5000);
            });
    });

    it('send confirm #5', (done) => {
        chai.request(server)
            .post('/shipment/confirm')
            .send({
                "multisigPrivateKeyName": "SENSOR_TOTAL_MULTISIG_PRIVATE",
                "cosignerPrivateKeyName": "SENSOR_TEMP_PRIVATE" // 
              })
            .end(function(err, res) {
                expect(res).to.have.status(200);
                setTimeout(function(){done();},5000);
            });
    });
  
});

