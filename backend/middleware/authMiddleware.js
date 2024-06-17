import jwt from 'jsonwebtoken';

export const protect = (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
      next();
    } catch (error) {
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  } else {
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};

export const superUser = (req, res, next) => {
  if (req.user && req.user.role === 'superuser') {
    next();
  } else {
    res.status(403).json({ message: 'Require superuser role' });
  }
};
