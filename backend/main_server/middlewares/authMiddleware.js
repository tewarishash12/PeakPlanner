const jwt = require("jsonwebtoken");
const User = require("../main_models/user");

function authLogin(req, res, next) {
    const authHeader = req.headers['authorization'];

    const accesstoken = authHeader && authHeader.split(" ")[1];

    if (!accesstoken)
        return res.status(400).json({ message: "Access token is tampered" });

    jwt.verify(accesstoken, process.env.ACCESS_TOKEN_SECRET, async (err, data) => {
        if (err) {
            if (err.name === "TokenExpiredError")
                return res.status(401).json({ message: "Token expired" });
            
            return res.status(403).json({ message: "Unauthorized to access" });
        }

        const userData = await User.findById(data.user._id).select("-__v")
        req.user = userData;
        next();
    })
}

function adminValidation(){
    if(req.user.role!=="admin")
        return res.status(401).json({message:"you are unauthorised to make this request"});
    next();
}

function managerValidation(){
    if(req.user.role!=="manager")
        return res.status(401).json({message:"you are unauthorised to make this request"});
    next();
}

function teammemberValidation(){
    if(req.user.role!=="teammember")
        return res.status(401).json({message:"you are unauthorised to make this request"});
    next();
}

module.exports = { authLogin,adminValidation,managerValidation,teammemberValidation }