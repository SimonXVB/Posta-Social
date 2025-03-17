const jwt = require("jsonwebtoken");

function bodyAuth(req, res, next) {
    try {
        const token = req.cookies.token;

        if(!token) {
            console.error("token unauthenticated");
            return res.status(500).json("internalError");
        };
        
        const user = jwt.verify(token, process.env.SECRET);

        if(Number(user.userId) === Number(req.body.userId)) {
            next();
        } else {
            console.error("user unauthenticated");
            return res.status(500).json("internalError");
        };
    } catch (error) {
        console.error(error);
        return res.status(500).json("internalError");
    };
};

function paramsAuth(req, res, next) {
    try {
        const token = req.cookies.token;

        if(!token) {
            console.error("token unauthenticated")
            return res.status(500).json("internalError");
        };
        
        const user = jwt.verify(token, process.env.SECRET);

        if(Number(user.userId) === Number(req.params.userId)) {
            next();
        } else {
            console.error("user unauthenticated")
            return res.status(500).json("internalError");
        };
    } catch (error) {
        console.error(error);
        return res.status(500).json("internalError");
    };
};

module.exports = {
    bodyAuth,
    paramsAuth
};