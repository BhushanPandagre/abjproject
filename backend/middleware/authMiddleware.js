
const jwt = require('jsonwebtoken');

exports.authenticate = (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided' });
  }
  try {
    const decoded = jwt.verify(token, 'your-secret-key');
    req.user = decoded;
    next();
  } catch (error) {
    res.status(400).json({ message: 'Invalid token' });
  }
};

let blacklistedTokens = [];

exports.authenticateToken = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1]; // Assuming token in Authorization header

    // Verify token validity and role permissions
    jwt.verify(token, 'YourJWTSecret', (err, decodedToken) => {
        if (err) {
            return res.status(401).json({ message: 'Invalid token' });
        }
        req.user = decodedToken;
        next();
    });
};



exports.checkPermissions = (requiredPermissions) => (req, res, next) => {
    // Check if user has all required permissions
    const { permissions } = req.user;
    const hasPermission = requiredPermissions.every(permission => permissions.includes(permission));

    if (!hasPermission) {
        return res.status(403).json({ message: 'Unauthorized access' });
    }
    next();
};
