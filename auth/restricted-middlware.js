const jwt = require("jsonwebtoken");
const secret = require("../config/secret");

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization || "";
  const token = authHeader.split(" ")[1];

  if (token) {
    jwt.verify(token, secret.jwtSecret, (err, decodedToken) => {
      if (err) {
        res.status(401).json({ message: "you shall not pass" });
      } else {
        res.decodedJWT = decodedToken;
        next();
      }
    });
  } else {
    res.status(401).json({ you: "shall not pass" });
  }
};
//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImpvbjIiLCJpYXQiOjE2MDc2NTk0NzAsImV4cCI6MTYwNzc0NTg3MH0.iTlogyRnHW55PMje2IApbq4spjfL9mSpyYwlBf-T2Qo
