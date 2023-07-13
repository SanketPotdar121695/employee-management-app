const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { secretKey } = require('../config/db');
const { UserModel } = require('../models/user.model');

const signup = async (req, res) => {
  let { email, password } = req.body;
  try {
    let existingUser = (await UserModel.findOne({ email })) || null;

    if (existingUser) {
      return res.status(400).send({
        error: 'Registration failed!',
        description:
          'A user already exists with the same email ID. Please try again with different email ID.'
      });
    }
    const hashedPassword = bcrypt.hashSync(password, 5);
    let user = new UserModel({ email, password: hashedPassword });
    await user.save();

    return res.status(200).send({ message: 'Registration successful!' });
  } catch (err) {
    return res.status(400).send({ error: err.message });
  }
};

const login = async (req, res) => {
  let { email, password } = req.body;
  try {
    let existingUser = (await UserModel.findOne({ email })) || null;

    if (existingUser) {
      let result = await bcrypt.compare(password, existingUser.password);

      if (result) {
        const token = jwt.sign({ userID: existingUser._id }, secretKey);
        return res.status(200).send({ message: 'Login successful!', token });
      }

      return res.status(400).send({
        error: 'Login failed!',
        description:
          'Wrong credentials Provided. Please check your password and try again.'
      });
    }

    return res.status(400).send({
      error: 'Login failed!',
      description:
        'Wrong credentials Provided. Please check your emailID and try again.'
    });
  } catch (err) {
    return res.status(400).send({ error: err.message });
  }
};

module.exports = { signup, login };
