import * as mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';
const config = require("../config");
import { IShipment } from "../interfaces/shipment";
let Schema = mongoose.Schema;

/**
 * Shipment schema for mangoose
 * @type {Schema}
 */
let Shipment = new Schema({
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
});

export let shipmentSchemaModel: mongoose.Model<IShipment> = mongoose.model<IShipment>('Shipment', Shipment);

