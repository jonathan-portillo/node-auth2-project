const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const secret = require("../config/secret");

const router = require("express").Router();
const users = require("../users/user-model");
const { isValid } = require("../users/users-service");

router.post("/register", async (req, res, next) => {
  const credentials = req.body;
  try {
    if (isValid(credentials)) {
      const rounds = process.env.BCRYPT_ROUNDS || 8;

      const hash = bcryptjs.hashSync(credentials.password, rounds);
      credentials.password = hash;
      const user = await users.add(credentials);
      const token = generateToken(user);
      res.status(201).json({ data: credentials, token });
    } else {
      res.status(400).json({
        message: "username or password missing, or password not alphanumeric",
      });
    }
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ message: "Error with database or user already exists" });
  }
});

const generateToken = (user) => {
  const payload = {
    subject: user.id,
    username: user.username,
    department: user.role,
  };
  const options = {
    expiresIn: "1d",
  };

  return jwt.sign(payload, secret.jwtSecret, options);
};

module.exports = router;
