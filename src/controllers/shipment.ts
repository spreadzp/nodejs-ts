const config = require("../config");
//Web
import express = require('express');
import { TxMijinService } from "../helpers/tx_mijin";

let router = express.Router();
let _ = require('lodash');
let mijin_service = new TxMijinService();

//Create new shipment
router.post('/create', (req, res) => {

    // console.log('Input request: %j', req.body);
    // console.log('Input request status: %j', req.statusCode);

    //Express validation
    req.checkBody('shipmentId', 'Invalid shipmentId').notEmpty();
    req.checkBody('startShipmentTime', 'Invalid startShipmentTime').notEmpty();
    req.checkBody('payment', 'Invalid payment').isInt().notEmpty();
    req.checkBody('goodsName', 'Invalid goodsName').notEmpty();
    req.checkBody('quantityOfGoods', 'Invalid quantityOfGoods').isInt().notEmpty();
    req.checkBody('endShipmentTime', 'Invalid endShipmentTime').notEmpty();
    req.checkBody('sellerPublicKeyName', 'Invalid sellerPublicKeyName').notEmpty();
    req.checkBody('statusShipment', 'Invalid statusShipment').notEmpty();
   
    req.getValidationResult().then((result) => {
        if (!result.isEmpty()) {
            return res.status(400).send({ result: result.array(), isError: true });
        }

        let shipment = req.body;
  
        mijin_service.createShipment(
            shipment.buyerPrivateKeyName, 
            shipment.sellerPublicKeyName, 
            shipment.quantityOfGoods,
            shipment.goodsName, 
            shipment.payment
        );
    
        return res.status(200).send({ result: "OK", 'isError': false});
    })
   
});


//Confirm shipment
router.post('/confirm', (req, res) => {

    req.checkBody('multisigPrivateKeyName', 'Invalid multisigPrivateKeyName').notEmpty();
    req.checkBody('cosignerPrivateKeyName', 'Invalid cosignerPrivateKeyName').notEmpty();

    req.getValidationResult().then((result) => {
        if (!result.isEmpty()) {
            return res.status(400).send({ result: result.array(), isError: true });
        }
        
        mijin_service.confirm(req.body.multisigPrivateKeyName, req.body.cosignerPrivateKeyName);

        if (
            req.body.cosignerPrivateKeyName === 'SENSOR_TRAIN_DRIVER_MULTISIG_PRIVATE' ||
            req.body.cosignerPrivateKeyName === 'SENSOR_WEIGHT_PRIVATE'
        ) {
            const resObject = { StatusRun: 'true' };
            res.status(200).json(resObject);
        } else {
            res.status(200).json('');
        }
    })
});

export = router;

