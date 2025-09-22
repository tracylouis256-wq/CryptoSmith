const jwt = require('jsonwebtoken');
const { User } = require('../models');

exports.authenticate = async (req, res, next) => {
  const auth = req.headers.authorization;
  if(!auth) return res.status(401).json({ message: 'Missing auth' });
  const token = auth.replace(/^Bearer\s+/i, '');
  try{
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findByPk(payload.sub);
    if(!user) return res.status(401).json({ message: 'Invalid token' });
    req.user = user;
    next();
  }catch(err){
    return res.status(401).json({ message: 'Invalid token' });
  }
};
