export {};
const jwt = require('jsonwebtoken');

module.exports = function (req:any, res:any, next:any) 
{
    if (req.method === "OPTIONS") next();

    try
    {
        const token = req.headers.authorization.split(' ')[1];

        if (!token) return res.status(401).json({ message: "User is not autorized!" });
    
        const decoded = jwt.verify(token, process.env.SECRET_KEY);

        req.user = decoded;
        
        next();
    }
    catch(e)
    {
        res.status(401).json({ message: "User is not autorized!" });
    }
}