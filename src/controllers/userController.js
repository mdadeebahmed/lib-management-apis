const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const register = async (request, response) => {
  try {
    const { name, username, email, password } = request.body;
    if (!name || !username || !email || !password) {
      return response.status(400).json({ message: 'All fields are required' });
    }

    const existingUsername = await User.findOne({ username });

    if (existingUsername) {
      return response.status(409).json({ message: 'Username already exists' });
    }

    const existingEmail = await User.findOne({ email });

    if (existingEmail) {
      return response.status(409).json({ message: 'Email already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      username,
      email,
      password: hashedPassword,
      role: 'STUDENT',
      status: 'ACTIVE',
    });

    const user = new User(newUser);
    await user.save();

    response
      .status(201)
      .json({ message: 'User registered successfully', data: newUser });
  } catch (error) {
    response.status(500).json(error.message);
  }
};

const login = async (request, response) => {
  try {
    const { username, password } = request.body;
    if (!username || !password) {
      return response
        .status(400)
        .json({ message: 'Username and password are required' });
    }
    const user = await User.findOne({ username });
    if (!user) {
      return response.status(404).json({ message: 'User not found' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return response.status(401).json({ message: 'Invalid password' });
    }

    const token = jwt.sign(
      {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    response.status(200).json({ message: 'Login successful', data: { token } });
  } catch (error) {
    response.status(500).json(error.message);
  }
};

const profile = async (request, response) => {
  try {
    const user = request.user;
    response
      .status(200)
      .json({ message: 'User profile fetched successfully', data: user });
  } catch (error) {
    response.status(500).json(error.message);
  }
};

module.exports = {
  register,
  login,
  profile,
};
