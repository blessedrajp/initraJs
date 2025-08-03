export default `const {{nameLower}}Middleware = (options = {}) => {
  return async (req, res, next) => {
    try {
      // Middleware logic here
      console.log('{{name}} middleware executed');
      
      // Example: Add custom header
      res.setHeader('X-{{name}}-Processed', 'true');
      
      // Example: Modify request
      req.{{nameLower}}Data = {
        timestamp: new Date(),
        ...options
      };
      
      // Continue to next middleware
      next();
    } catch (error) {
      console.error('{{name}} middleware error:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error'
      });
    }
  };
};

module.exports = {{nameLower}}Middleware;
`;