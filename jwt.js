const jwt = require("jsonwebtoken");

const jwtAuthMiddleware = (req, res, next) => {
  // Check if the request headers have authorization
  const authorization = req.headers.authorization;
  if (!authorization) return res.status(401).json({ error: "Token not found" });

  // Extract the JWT token from the request headers
  const token = authorization.split(" ")[1];
  if (!token) return res.status(401).json({ error: "Unauthorized" });

  try {
    // Verify the JWT token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) return res.status(401).json({ error: "Invalid token" });

    // Attach user information to the request object
    req.user = decoded;
    next();
  } catch (err) {
    console.error(err);
    res.status(401).json({ error: "Invalid token" });
  }
};

// Function to generate JWT token
const generateToken = (userData) => {
  // Ensure JWT_SECRET is defined
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined in environment variables");
  }

  // Generate a new JWT token using user data
  return jwt.sign(userData, process.env.JWT_SECRET, { expiresIn: '30m' }); // 30 minutes
};

module.exports = { jwtAuthMiddleware, generateToken };