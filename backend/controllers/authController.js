import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import User from '../models/User.js';

const generateToken = (user) => {
  return jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

export const registerSuperUser = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = new User({ username, password, role  });
    await user.save();
    const token = generateToken(user);
    res.status(201).json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Failed to create superuser' });
  }
};

export const loginUser = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (user && await bcrypt.compare(password, user.password)) {
      const token = generateToken(user);
      res.json({ token });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Failed to login' });
  }
};

export const registerUser = async (req, res) => {
    const { username, password, role } = req.body;
  
    try {
      const existingUser = await User.findOne({ username });
  
      if (existingUser) {
        return res.status(400).json({ message: 'Username already exists' });
      }
  
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
  
      const newUser = new User({ username, password: hashedPassword, role });
      await newUser.save();
  
      res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
      console.error('Error registering user:', error);
      res.status(500).json({ message: 'Failed to register user' });
    }
  };