const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const CustomError = require('../utils/customError');

const register = async (req, res, next) => {
  const { username, email, password } = req.body;

  try {
    // Input validation
    if (!username || !email || !password) {
      throw new CustomError(400, 'Please provide all required fields');
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw new CustomError(400, 'Please provide a valid email address');
    }

    // Password strength check (example: at least 8 characters)
    if (password.length < 8) {
      throw new CustomError(400, 'Password must be at least 8 characters long');
    }

    // Check if user already exists
    let user = await User.findOne({ email });
    if (user) {
      throw new CustomError(400, 'User with this email already exists');
    }

    // Create new user
    user = new User({
      username,
      email,
      password,
    });

    // Hash password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    // Save user to database
    await user.save();

    const userResponse = user.toObject();
    delete userResponse.password;

    // Create JWT payload
    const payload = {
      user: {
        id: user.id,
      },
    };

    // Sign token
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '1h' },
      (err, token) => {
        if (err) throw err;
        res.status(201).json({
          message: 'User registered successfully',
          token,
          // user: {
          //   id: user.id,
          //   username: user.username,
          //   email: user.email,
          // },
          user: userResponse,
        });
      }
    );
  } catch (err) {
    if (err instanceof CustomError) {
      next(err);
    } else {
      next(new CustomError(500, 'Server Error'));
    }
  }
};

const login = async (req, res, next) => {
  const { username, password } = req.body;

  try {
    // Find user by username or email
    let user = await User.findOne({
      $or: [{ email: username }, { username: username }],
    });

    if (!user) {
      throw new CustomError(400, 'Invalid credentials');
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new CustomError(400, 'Invalid credentials');
    }

    // Create payload for JWT
    const payload = {
      user: {
        id: user.id,
      },
    };

    // Sign token
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '1h' },
      (err, token) => {
        if (err) throw err;

        // Filter out password from user object
        const userResponse = user.toObject();
        delete userResponse.password;

        // Send response with token and user info
        res.json({
          message: 'Login successful',
          token,
          user: userResponse,
        });
      }
    );
  } catch (err) {
    next(err);
  }
};

const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    next(err);
  }
};

module.exports = { login, register, getUser };
