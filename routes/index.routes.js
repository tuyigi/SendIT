const express = require('express')
const router = express.Router()

router.use('/api/v1/users', require('./user.routes'))
router.use('/api/v1/parcels', require('./parcel.routes'))

module.exports = router