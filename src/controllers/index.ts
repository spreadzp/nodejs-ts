import express = require('express');

let _ = require('lodash');
let router = express.Router();

//router.use('/user', require('./user'));
router.use('/account', require('./account'));
router.use('/shipment', require('./shipment'));

router.use((err, req, res, next) => {
    if (err.name === 'UnauthorizedError') {
        return res.status(401).send('Invalid token');
    }
});

export = router;
