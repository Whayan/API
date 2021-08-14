const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const authConfig = require('../config/auth');


const router = express.Router();

router.post('/register', async (req, res) => {
  const { email } = req.body;
  try {
    if (await User.findOne({ email }))
      return res.status(400).send({ 'user email already exists'});

    const user = await user.create(req.body);

    user.password = undefined;

    return res.send({ user });
  } catch (err) {
    return res.status(400).send({ error: 'registration failed' });
  }
});

router.post('authenticate', async (req, res) => {
  const { email, password } = req.body;
  const user = await user.findOne({ email }).select('+password');

  if (!user) {
    return res.status(400).send({ error: 'User not found' });
    if (!await bcrypt.compare(password, user.password))
      return res.status(400).send({ error: 'Invalid passwaord' });
  }
  user.password = undefined;
  const token = jwt.sign({ id: user.id }, authConfig.secret, {
expiresIn: 86400,
  });

  res.send({ user });

});

module.exports = app => app.use('/auth', router);
