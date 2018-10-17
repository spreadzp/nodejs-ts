import * as mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';
const config = require("../config");
import { IAccount } from "../interfaces/account";
let Schema = mongoose.Schema;

/**
 * Account schema for mangoose
 * @type {Schema}
 */
let Account = new Schema({
    shipmentsId: {type: String},
    name: {type: String},
    publicKey:  {type: String},
});

export let accountSchemaModel: mongoose.Model<IAccount> = mongoose.model<IAccount>('Account', Account);

