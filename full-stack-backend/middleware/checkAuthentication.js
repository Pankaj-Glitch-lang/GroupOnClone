const jwt=require('jsonwebtoken')
const authenticate = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1]; // Get the token from the Authorization header
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    jwt.verify(token, 'Masai', (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: 'Forbidden' });
        }
        console.log(decoded)
        req.body.userId = decoded.userId; // Attach user info to the request
        next();
    });
};

module.exports={authenticate};