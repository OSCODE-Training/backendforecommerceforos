var jwt=require('jsonwebtoken');

const verifyTokenAndRole = (allowedRoles) => {
    return (req, res, next) => {
      const token = req.headers.authorization;
  
      if (!token) {
        return res.status(401).json({ status: false, message: "Token is required" });
      }
  
      jwt.verify(token, "shhhhhh", (err, decoded) => {
        if (err) {
          return res.status(401).json({ status: false, message: "Invalid token" });
        }
        console.log("ooooooooooooooooooooooooooooooooooooooooooo:",decoded)
        req.data = decoded; // Store decoded user info in request
        
        if (!allowedRoles.includes(decoded.data.role)) {
          return res.status(403).json({ status: false, message: "Access denied: Insufficient permissions" });
        }
  
        next(); // User has a valid role, proceed to the next middleware/handler
      });
    };
  };

module.exports = { verifyTokenAndRole };
  