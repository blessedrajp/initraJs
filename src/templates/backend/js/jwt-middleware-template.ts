export default `const jwt = require('jsonwebtoken');

const jwtMiddleware = (options = {}) => {
  const {
    secret = process.env.JWT_SECRET || 'your-secret-key',
    expiresIn = '24h',
    algorithms = ['HS256']
  } = options;

  return async (req, res, next) => {
    try {
      // Get token from header
      const authHeader = req.headers.authorization;
      
      if (!authHeader) {
        return res.status(401).json({
          success: false,
          message: 'No token provided'
        });
      }

      // Check if bearer token
      const parts = authHeader.split(' ');
      if (parts.length !== 2 || parts[0] !== 'Bearer') {
        return res.status(401).json({
          success: false,
          message: 'Invalid token format'
        });
      }

      const token = parts[1];

      // Verify token
      jwt.verify(token, secret, { algorithms }, (err, decoded) => {
        if (err) {
          if (err.name === 'TokenExpiredError') {
            return res.status(401).json({
              success: false,
              message: 'Token expired'
            });
          }
          if (err.name === 'JsonWebTokenError') {
            return res.status(401).json({
              success: false,
              message: 'Invalid token'
            });
          }
          return res.status(401).json({
            success: false,
            message: 'Token verification failed'
          });
        }

        // Attach user info to request
        req.user = decoded;
        req.userId = decoded.id || decoded.userId;
        
        next();
      });
    } catch (error) {
      console.error('JWT middleware error:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error'
      });
    }
  };
};

// Helper function to generate token
jwtMiddleware.generateToken = (payload, options = {}) => {
  const {
    secret = process.env.JWT_SECRET || 'your-secret-key',
    expiresIn = '24h'
  } = options;

  return jwt.sign(payload, secret, { expiresIn });
};

// Helper function to decode token without verification
jwtMiddleware.decodeToken = (token) => {
  return jwt.decode(token);
};

module.exports = jwtMiddleware;
`;