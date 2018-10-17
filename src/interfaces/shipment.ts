import express = require('express');
import mongoose = require('mongoose');

import Schema = mongoose.Schema;
import Types = mongoose.Types;
import ObjectId = Types.ObjectId;

export interface IShipment extends mongoose.Document {
    shipmentId: String,
    startShipmentTime: String,
    buyerCurrency: String,
    payment: Number,
    goodsName: String,
    quantityOfGoods: Number,
    endShipmentTime: String,
    buyerPrivateKeyName: String,
    sellerPublicKeyName: String,
    statusShipment: String,
}
