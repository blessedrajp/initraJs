export default `import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface JwtOptions {
  secret?: string;
  expiresIn?: string;
  algorithms?: string[];
}

interface JwtPayload {
  id?: string;
  userId?: string;
  [key: string]: any;
}

export const jwtMiddleware = (options: JwtOptions = {}) => {
  const {
    secret = process.env.JWT_SECRET || 'your-secret-key',
    expiresIn = '24h',
    algorithms = ['HS256']
  } = options;

  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const authHeader = req.headers.authorization;
      
      if (!authHeader) {
        return res.status(401).json({
          success: false,
          message: 'No token provided'
        });
      }

      const parts = authHeader.split(' ');
      if (parts.length !== 2 || parts[0] !== 'Bearer') {
        return res.status(401).json({
          success: false,
          message: 'Invalid token format'
        });
      }

      const token = parts[1];

      jwt.verify(token, secret, { algorithms }, (err: any, decoded: any) => {
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

        req.user = decoded as JwtPayload;
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
export const generateToken = (payload: JwtPayload, options: JwtOptions = {}): string => {
  const {
    secret = process.env.JWT_SECRET || 'your-secret-key',
    expiresIn = '24h'
  } = options;

  return jwt.sign(payload, secret, { expiresIn });
};

// Helper function to decode token without verification
export const decodeToken = (token: string): JwtPayload | null => {
  return jwt.decode(token) as JwtPayload;
};
`;