const express = require('express');

const { depositById } = require('../controller/profile');

const router = express.Router();

/**
 * @returns Deposits money into the the balance of a client, a client
 * can't deposit more than 25% his total of jobs to pay. (at the deposit moment)
 */
router.post('/deposit/:userId', depositById);

module.exports = router;
