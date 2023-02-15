const Car = require('../model/Car')

const getAllCars = async (req, res) => {
  try {
    const cars = await Car.find({})
    res.status(200).json({
      cars,
    })
  } catch (error) {
    res.status(400).json({
      message: error.message,
    })
  }
}

const insertCar = async (req, res) => {
  try {
    const { model, selectedFile, maxSpeed, maker } = req.body
    const newCar = new Car({
      model,
      maker,
      selectedFile,
      maxSpeed,
    })
    await newCar.save()
    res.status(201).json({
      saved: true,
      car: newCar,
    })
  } catch (error) {
    res.status(400).json({
      message: error.message,
      saved: false,
    })
  }
}

module.exports = {
  getAllCars,
  insertCar,
}
