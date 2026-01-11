const jwt = require('jsonwebtoken');
const db = require('../utils/mockMongoose');

const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      console.log('[AuthMiddleware] Token received:', token.substring(0, 10) + '...');

      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret');
      console.log('[AuthMiddleware] Decoded:', decoded);

      req.user = await db.User.findById(decoded.id);

      if (!req.user) {
        console.log('[AuthMiddleware] User not found for ID:', decoded.id);
        return res.status(401).json({ msg: 'User not found' });
      }

      console.log('[AuthMiddleware] User authenticated:', req.user.email);
      next();
    } catch (err) {
      console.error('[AuthMiddleware] Auth error:', err.message);
      return res.status(401).json({ msg: 'Not authorized, token failed' });
    }
  } else {
    console.log('[AuthMiddleware] No token in header:', req.headers.authorization);
    return res.status(401).json({ msg: 'Not authorized, no token' });
  }
};

const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      console.log('[AuthMiddleware] Authorize check: No user');
      return res.status(401).json({ msg: 'Not authorized' });
    }

    if (!roles.includes(req.user.role)) {
      console.log(`[AuthMiddleware] Role mismatch. User: ${req.user.role}, Allowed: ${roles}`);
      return res.status(403).json({ msg: `User role '${req.user.role}' is not authorized to access this route` });
    }

    console.log('[AuthMiddleware] Authorization successful');
    next();
  };
};

module.exports = { protect, authorize };
