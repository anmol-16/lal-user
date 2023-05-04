const jwt = require('jsonwebtoken');

function protectRoute(req, res, next) {
    if(req.cookies.login) {
        let isVerified = jwt.verify(req.cookies.login,process.env.JWT_KEY);
        if(isVerified) {
            next();
        }
        else {
            return res.json({
                msg:"user not verified"
            })
        }
    }
    else {
        return res.json({
            msg:"operation not allowed"
        })
    }
}

module.exports = {
    protectRoute
}