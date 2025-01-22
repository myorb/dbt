const express = require('express')
const router = express.Router();

const { getContractById, getAllContracts } = require('../controller/contract');
const { getProfile } = require('../middleware/getProfile');

/**
* @returns contract by id
*/
router.get('/',getProfile, getAllContracts);

/**
 * @returns Returns a list of contracts belonging to a 
 * user (client or contractor), the list should only contain non terminated 
 * contracts.
 */
router.get('/:id', getProfile, getContractById);

module.exports = router;