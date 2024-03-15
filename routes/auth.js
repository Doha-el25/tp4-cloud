const jwt = require('jsonwebtoken');
function verifyToken(req, res, next) {
    const token = req.header('Authorization');
    if (!token) {
        return res.status(403).json({ message: "Le token est obligatoire pour l’authentification" });
    }

    try {
        const decoded = jwt.verify(token, process.env.TOKEN);
        req.user = decoded.user; 
        next(); 
    } catch (error) {
        return res.status(401).json({ message: "Token invalide" });
    }
}
module.exports = verifyToken;