const express = require('express');
const router = express.Router();
const { adminOnly } = require('../middleware/adminOnly');

const { getBestProfession, getBestClients } = require('../controller/admin');

/**
 * @returns Returns the profession that earned the most money (sum of jobs paid)
 * for any contactor that worked in the query time range.
 */
router.get('/best-profession', adminOnly, getBestProfession);

/**
 * @returns the clients the paid the most for jobs in the query time period.
 * Limit query parameter should be applied, default limit is 2.
 *
 *[
 *    {
 *        "id": 1,
 *        "fullName": "Reece Moyer",
 *        "paid" : 100.3
 *    },
 *    {
 *        "id": 200,
 *        "fullName": "Debora Martin",
 *        "paid" : 99
 *    },
 *    {
 *        "id": 22,
 *        "fullName": "Debora Martin",
 *        "paid" : 21
 *    }
 *]
 */
router.get('/best-clients', adminOnly, getBestClients);

module.exports = router;
