// middleware/customMiddleware.js
const customMiddleware = (req, res, next) => {
    // Perform actions before reaching the route handler
    console.log('Custom Middleware executed');
    // You can modify the request or response objects here if needed
    next();
  };
  
  module.exports = customMiddleware;