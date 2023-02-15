const User = require('../model/User')
const {
  registerValidation,
  loginValidation,
} = require('../util/userVALIDATION')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const handleSignUp = async (req, res) => {
  //lets validate data befor we add user

  const { error } = registerValidation(req.body)
  if (error) return res.status(400).send(error.details[0].message)

  //checking if the user is aready exist
  const emailExist = await User.findOne({ email: req.body.email })
  if (emailExist)
    return res.status(400).json({
      message: 'Email aready exist',
      saved: false,
    })

  //hass the password
  const salt = await bcrypt.genSalt(10)
  const hashedPsw = await bcrypt.hash(req.body.password, salt)

  //create new user
  const { name, email } = req.body
  const newUser = new User({
    name,
    email,
    password: hashedPsw,
  })

  try {
    await newUser.save()
    res.status(201).json({ user: newUser, message: 'user saved!' })
  } catch (error) {
    res.status(409).json({ message: error.message })
  }
}

const handleLogin = async (req, res) => {
  //lets validate data befor we add user
  const { error } = loginValidation(req.body)
  if (error) return res.status(400).send(error.details[0].message)

  //checking if the user is aready exist
  const user = await User.findOne({ email: req.body.email })
  if (!user) return res.status(400).json({ message: 'email is wrong' })

  //PASSWORD IS CORRECT
  const validPSW = await bcrypt.compare(req.body.password, user.password)
  if (!validPSW) return res.status(400).json({ message: 'password is wrong' })

  //assign token

  const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET)
  res.header('x-auth-token', token)

  //if all is okay
  res.status(200).json({ token: token })
}

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({})
    res.status(200).send(users)
  } catch (error) {
    res.status(400).json({
      message: error.message,
    })
  }
}

module.exports = {
  handleSignUp,
  handleLogin,
  getAllUsers,
}
