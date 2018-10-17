import * as mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';

import jwt = require('jsonwebtoken');

import { model } from 'mongoose';
import { accountSchemaModel } from '../models/account';
import { IAccount } from '../interfaces/account';
import { RepositoryBase } from "./base";
import _ = require('lodash');
const config = require("../config");
import { simpleResponse } from "../helpers/convertors";

import ObjectId = mongoose.Types.ObjectId;

export class AccountModel {

    private _accountModel: IAccount;

    constructor(_accountModel: IAccount) {
        this._accountModel = _accountModel;
    }

    static update(data: any): Promise<String> {
        let promise = new Promise((resolve, reject) => {
            let repo = new AccountRepository();
            repo.findOne({ _id: data._id })
                .select('firstName lastName _id')
                .exec((err, account) => {
                    if (err) {
                        reject(err);
                    }
                    else {
                        _.forEach(data, (value, key) => {
                            account[key] = value;
                        });
                        account.save((err) => {
                            if (err)
                                return reject(err);
                            return resolve(account);
                        });
                    }
                });
        });
        return promise;
    }

    static delete(_id: string): Promise<String> {
        let promise = new Promise((resolve, reject) => {
            let repo = new AccountRepository();
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


export class AccountRepository extends RepositoryBase<IAccount> {
    constructor() {
        super(accountSchemaModel);
    }
}
//Close model for write
Object.seal(AccountModel);
Object.seal(AccountRepository);