const express = require('express');
const router = express.Router();

const { getAllUnpaidJobs, payJob } = require('../controller/job');
const { getProfile } = require('../middleware/getProfile');
const { validateIsClient } = require('../middleware/validateProfile');

/**
 * @returns Get all unpaid jobs for a user, for active contracts only. (in_progress)
 */
router.get('/unpaid', getProfile, getAllUnpaidJobs);

/**
 * @returns POST `/jobs/:job_id/pay` - Pay for a job,
 * a client can only pay if his balance >= the amount to pay.
 * The amount should be moved from the client's balance to the contractor balance.
 */
router.post('/:job_id/pay', getProfile, validateIsClient, payJob);

module.exports = router;
