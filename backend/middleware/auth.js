const jwt = require("jsonwebtoken");

const authMiddleware = async (req, res, next) => {
  const token = req.headers["token"];
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // req.user = decoded;
    req.body.userId = decoded.id;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token!" });
  }
};

const adminMiddleware = async (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    return res.status(403).json({ message: "Access Denied. Admin only" });
  }
};

module.exports = { authMiddleware, adminMiddleware };
