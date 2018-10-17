import express = require('express');
import mongoose = require('mongoose');

import Schema = mongoose.Schema;
import Types = mongoose.Types;
import ObjectId = Types.ObjectId;

export interface IAccount extends mongoose.Document {
    shipmentsId: String,
    name: String,
    publicKey: String,
}
