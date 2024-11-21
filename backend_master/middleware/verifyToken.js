const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
    const authHeader = req.header("Authorization");
    const token = authHeader && authHeader.startsWith("Bearer ") ? authHeader.split(" ")[1] : null;

    if (!token) {
        return res.status(403).json({ message: "Access denied. No token provided." });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Attach user info to the request
        next();
    } catch (error) {
        console.error("Token Verification Error:", error);
        res.status(401).json({ message: "Invalid or expired token." });
    }
};

module.exports = verifyToken;
