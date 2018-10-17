import * as mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';

import jwt = require('jsonwebtoken');

import { model } from 'mongoose';
import { shipmentSchemaModel } from '../models/shipment';
import { IShipment } from '../interfaces/shipment';
import { RepositoryBase } from "./base";
import _ = require('lodash');
const config = require("../config");
import { simpleResponse } from "../helpers/convertors";

import ObjectId = mongoose.Types.ObjectId;

export class ShipmentModel {

    private _shipmentModel: IShipment;

    constructor(_shipmentModel: IShipment) {
        this._shipmentModel = _shipmentModel;
    }

    static update(data: any): Promise<String> {
        let promise = new Promise((resolve, reject) => {
            let repo = new ShipmentRepository();
            repo.findOne({ _id: data._id })
                .select('firstName lastName _id')
                .exec((err, shipment) => {
                    if (err) {
                        reject(err);
                    }
                    else {
                        _.forEach(data, (value, key) => {
                            shipment[key] = value;
                        });
                        shipment.save((err) => {
                            if (err)
                                return reject(err);
                            return resolve(shipment);
                        });
                    }
                });
        });
        return promise;
    }

    static delete(_id: string): Promise<String> {
        let promise = new Promise((resolve, reject) => {
            let repo = new ShipmentRepository();
            repo.delete(_id, (err, result) => {
                console.log(err, result);
                if (err)
                    return reject(err);
                return resolve(result);
            })
        });
        return promise;
    }

}


export class ShipmentRepository extends RepositoryBase<IShipment> {
    constructor() {
        super(shipmentSchemaModel);
    }
}
//Close model for write
Object.seal(ShipmentModel);
Object.seal(ShipmentRepository);