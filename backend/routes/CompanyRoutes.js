const express = require('express');
const requireAuth = require('../middleware/requireAuth');
const { createCompany, getCompanies, getCompanyProfile } = require('../Controller/Companycontroller');

const router = express.Router();

router.get('/', getCompanies);
router.post('/', requireAuth, createCompany);
router.get('/profile', requireAuth, getCompanyProfile);

module.exports = router;
