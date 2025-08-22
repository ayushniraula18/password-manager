const jwt = require("jsonwebtoken");

const validateUser = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    res.status(401);
    res.json({ error: "Authorization header is required" });
    return;
  }

  if(authorization){
     jwt.verify(authorization, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        res.status(401);
        res.json({ error: "Invalid token" });
        return;
      }
      next();
    });
  }


};

module.exports = validateUser;
