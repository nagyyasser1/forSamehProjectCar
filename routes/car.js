const express = require('express')
const router = express.Router()
const { getAllCars, insertCar } = require('../controllers/car')

router.get('/', getAllCars)
router.post('/', insertCar)

module.exports = router
