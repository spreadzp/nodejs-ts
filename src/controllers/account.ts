const config = require("../config");
//Web
import express = require('express');

//Helpers 
import { AccountMijinService } from "../helpers/account_mijin";
import { AccountHelper } from "../helpers/account";
import { TransactionHelper } from "../helpers/transaction";

let router = express.Router();
let _ = require('lodash');
let account_mijin = new AccountMijinService();
let transaction_helper = new TransactionHelper();
let account_helper = new AccountHelper();

//Registration
router.post('/', (req, res) => {});

router.post('/create-multisig', (req, res) => {

    req.checkBody('nameMultisigPrivate', 'Invalid nameMultisigPrivate').notEmpty();
    req.checkBody('consigners', 'Invalid consigners').notEmpty();

    req.getValidationResult().then((result) => {
      if (!result.isEmpty()) {
          return res.status(400).send({ result: result.array(), isError: true });
      }
      account_mijin.createMultisig(req.body.nameMultisigPrivate, req.body.consigners);
    })
})

router.get('/partial', (req, res) => {
    transaction_helper.getPartialTx('INITIATOR_PRIVATE').subscribe((partial) => {
        return res.status(200).send(partial);
    });
});

router.get('/info-account/:id', (req, res) => {
    account_helper.getAccountInfo(req.params.id)
    .then
      ((info) => {
        info.subscribe(t => {
          const res1 = JSON.stringify(t);
          return res.status(200).send(res1);
        })
        ;
      });
});

router.get('/tx-info/:pubkey', (req, res) => {
    account_helper.getAccountTransactions(req.params.pubkey)
    .then
    ((info) => {
      info.subscribe(t => {
        const res1 = JSON.stringify(t);
        return res.status(200).send(res1);
      })
      ;
    });
});

export = router;

