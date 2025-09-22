const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../models');

exports.register = async (req, res, next) => {
  try{
    const { email, password, name } = req.body;
    const existing = await User.findOne({ where: { email } });
    if(existing) return res.status(400).json({ message: 'Email already in use' });
    const passwordHash = await bcrypt.hash(password, 12);
    const user = await User.create({ email, passwordHash, name });
    // TODO: send verification email
    res.status(201).json({ id: user.id, email: user.email });
  }catch(err){ next(err); }
};

exports.login = async (req, res, next) => {
  try{
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if(!user) return res.status(401).json({ message: 'Invalid credentials' });
    const ok = await bcrypt.compare(password, user.passwordHash);
    if(!ok) return res.status(401).json({ message: 'Invalid credentials' });
    const token = jwt.sign({ sub: user.id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
    res.json({ token });
  }catch(err){ next(err); }
};
