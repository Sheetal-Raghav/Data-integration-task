
const express = require('express');
const { getCasesByCity, getAllCases } = require('../controllers/caseController');

const router = express.Router();
router.get('/aggregated', getCasesByCity);
router.get('/all-case', getAllCases);

module.exports = router;
