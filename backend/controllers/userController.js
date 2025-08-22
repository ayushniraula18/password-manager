const User = require("../models/userModels");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const registerUserController = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    res.json({ error: "All fields are required" });
    return;
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    res.status(400);
    res.json({ error: "User already exists" });
    return;
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const userData = await User.create({ email, password: hashedPassword });
  res.status(200).json(userData);
};

const loginUserController = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    res.json({ error: "All fields are required" });
    return;
  }

  const existingUser = await User.findOne({ email });
  if (!existingUser) {
    res.status(400);
    res.json({ error: "User does not exist" });
    return;
  }

  const passwordMatch = await bcrypt.compare(password, existingUser.password);
  if (!passwordMatch) {
    res.status(400);
    res.json({ error: "Invalid credentials" });
    return;
  }

  const token = jwt.sign({ id: existingUser._id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  res.status(200).json({
    message: "Login successful",
    data: existingUser,
    accessToken: token,
  });
};

const viewUserDetailController = async (req,res)=>{
    const userId = req.params.id;
    const user = await User.findById(userId);
    res.status(200).json(user);
}

module.exports = { registerUserController, loginUserController, viewUserDetailController };
