const jwt = require('jsonwebtoken');

const jwtMiddleware = (req, res, next) => {
    const token = req.headers['token'];
    if (token == null) return res.status(401).send({ "message": "Jwt token is not found" });
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.status(403).send({ "message": "Something is wrong" });
        req.user = user;
        next();
    });

}

module.exports = { jwtMiddleware }