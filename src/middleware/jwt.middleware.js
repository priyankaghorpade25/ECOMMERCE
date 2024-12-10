import jwt from "jsonwebtoken";

const jwtAuth = (req, res, next) => {
    console.log("jwtAuth");
  const token = req.headers['authorization'];
  if (!token) {
    return res.status(401).send("Unauthorized: No token provided");
  }

  try {
    const payload = jwt.verify(token, "Vwo4tHqeha");
    console.log(payload);
    req.userId = payload.userId;
    
    console.log("userId",req.userId);
    next();
  } catch (err) {
    console.log(err);
    return res.status(403).send("Unauthorized: Invalid token");
  }
};

export default jwtAuth;
