const express = require('express')
const requireAuth = require('../middleware/requireAuth')
const { getDashboard } = require('../Controller/dashboardController')

const router = express.Router()
router.get('/', requireAuth, getDashboard)

module.exports = router