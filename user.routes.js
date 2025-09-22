const express = require('express');
const { authenticate } = require('../middleware/auth.middleware');
const router = express.Router();

router.get('/me', authenticate, (req, res) => {
  res.json({ id: req.user.id, email: req.user.email, name: req.user.name });
});

module.exports = router;
