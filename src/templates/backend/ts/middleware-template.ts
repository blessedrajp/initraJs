export default `import { Request, Response, NextFunction } from 'express';

interface {{name}}Options {
  // Add middleware options here
  logLevel?: 'debug' | 'info' | 'warn' | 'error';
  skipRoutes?: string[];
}

// Extend Express Request type to add custom properties
declare global {
  namespace Express {
    interface Request {
      {{nameLower}}Data?: {
        timestamp: Date;
        processedBy: string;
        [key: string]: any;
      };
    }
  }
}

export const {{nameLower}}Middleware = (options: {{name}}Options = {}) => {
  const {
    logLevel = 'info',
    skipRoutes = []
  } = options;

  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      // Skip middleware for certain routes
      if (skipRoutes.includes(req.path)) {
        return next();
      }

      // Log request based on log level
      if (logLevel === 'debug' || logLevel === 'info') {
        console.log(\`[{{name}}] Processing request: \${req.method} \${req.path}\`);
      }

      // Add custom header
      res.setHeader('X-{{name}}-Processed', 'true');
      res.setHeader('X-{{name}}-Timestamp', new Date().toISOString());

      // Attach data to request
      req.{{nameLower}}Data = {
        timestamp: new Date(),
        processedBy: '{{name}}Middleware',
        method: req.method,
        path: req.path,
        ip: req.ip || req.connection.remoteAddress
      };

      // Add request timing
      const startTime = Date.now();
      
      // Add cleanup on response finish
      res.on('finish', () => {
        const duration = Date.now() - startTime;
        if (logLevel === 'debug') {
          console.log(\`[{{name}}] Request completed in \${duration}ms\`);
        }
      });

      // Continue to next middleware
      next();
    } catch (error) {
      console.error('[{{name}}] Middleware error:', error);
      
      // Send error response
      res.status(500).json({
        success: false,
        message: 'Internal server error',
        error: process.env.NODE_ENV === 'development' ? error : undefined
      });
    }
  };
};

export default {{nameLower}}Middleware;
`;