import * as mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';

import jwt = require('jsonwebtoken');

import { model } from 'mongoose';
import { userSchemaModel } from '../models/user';
import { IUser } from '../interfaces/user';
import { RepositoryBase } from "./base";
import _ = require('lodash');
const config = require("../config");
import { simpleResponse } from "../helpers/convertors";

import ObjectId = mongoose.Types.ObjectId;

export class UserModel {

    private _userModel: IUser;

    constructor(_userModel: IUser) {
        this._userModel = _userModel;
    }

    get firstName(): string {
        return this._userModel.firstName;
    }

    static create(data: IUser): Promise<IUser> {
        let promise = new Promise((resolve, reject) => {
            let repo = new UserRepository();
            let user = <IUser>{
                login: data.login,
                password: data.password,
                email: data.email,
                lastName: data.lastName,
                firstName: data.firstName,
                photo: data.email,
            };

            repo.create(user, (err, res) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(res);
                }
            });
        });

        return promise;
    }

    static getPublicInfo(_id: ObjectId): Promise<IUser> {
        let promise = new Promise((resolve, reject) => {
            let repo = new UserRepository();
            repo.findOne({ _id: _id })
                .select('firstName lastName login -_id')
                .exec((err, res) => {
                    if (err) {
                        reject(err);
                    }
                    else {
                        resolve(res);
                    }
                });
        });
        return promise;
    }

    static auth(login: string, password: string): Promise<String> {
        let promise = new Promise((resolve, reject) => {
            let repo = new UserRepository();
            repo.findOne({ login: login })
                .select('password')
                .exec((err, user) => {
                    if (err) {
                        reject(err);
                    }
                    else {
                        repo.comparePassword(password, user.password, (err, isMatch) => {
                            let token = '';
                            //Good compare)
                            if (isMatch) {
                                token = jwt.sign({ id: user._id }, config.secretToken, {
                                    expiresIn: config.TOKEN_EXPIRATION
                                });
                                return resolve(token);
                            }
                            else
                                return reject('Bad password');
                        });
                    }
                });
        });
        return promise;
    }

    static update(data: any): Promise<String> {
        let promise = new Promise((resolve, reject) => {
            let repo = new UserRepository();
            repo.findOne({ _id: data._id })
                .select('firstName lastName _id')
                .exec((err, user) => {
                    if (err) {
                        reject(err);
                    }
                    else {
                        _.forEach(data, (value, key) => {
                            user[key] = value;
                        });
                        user.save((err) => {
                            if (err)
                                return reject(err);
                            return resolve(user);
                        });
                    }
                });
        });
        return promise;
    }

    static delete(_id: string): Promise<String> {
        let promise = new Promise((resolve, reject) => {
            let repo = new UserRepository();
            repo.delete(_id, (err, result) => {
                console.log(err, result);
                if (err)
                    return reject(err);
                return resolve(result);
            })
        });
        return promise;
    }

    static deleteWithPasswordChecking(password, _id: string): Promise<String> {
        let promise = new Promise((resolve, reject) => {
            let repo = new UserRepository();

            repo.findOne({ _id: _id })
                .select('firstName lastName _id password')
                .exec((err, user) => {
                    if (err) {
                        reject(err);
                    }
                    else {
                        repo.comparePassword(password, user.password, (err, isMatch) => {
                            if (isMatch) {
                                repo.delete(_id, (err, result) => {
                                    if (err)
                                        return reject(err);
                                    return resolve(true);
                                })
                            }
                            else
                                return reject('Bad passw4ord');
                        });
                    }
                });
        });
        return promise;
    }
}


export class UserRepository extends RepositoryBase<IUser> {
    comparePassword(password: string, myPassword: string, callback: (error: any, result: any) => void) {
        bcrypt.compare(password, myPassword, (err, isMatch) => {
            if (err) return callback(err, null);
            return callback(null, isMatch);
        });
    }

    constructor() {
        super(userSchemaModel);
    }
}
//Close model for write
Object.seal(UserModel);
Object.seal(UserRepository);