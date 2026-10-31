import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { rateLimit } from "express-rate-limit";
import jwt from "jsonwebtoken";

const app = express();
app.use(express.json());
dotenv.config();
const PORT = process.env.PORT || 5000;

//rate limit
const message = {
  message: "too many request from this ip address please try after sometime",
  success: false,
};
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 1, // limit each IP to 5 requests per windowMs
  message,
});

//connection to db
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("connected to db");
  })
  .catch((err) => {
    console.log("error while connecting to db", err);
  });

//schema building
const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
});

const User = mongoose.model("User", userSchema);
// const api="/api/v1/auth"
app.post("/register", async (req, res) => {
  const { username, email, password } = req.body;
  const isexisted = await User.findOne({ email });
  if (isexisted)
    return res.status(400).json({ message: "user already existed" });

  const hashedPassword = await bcrypt.hash(password, 10);
  // console.log(hashedPassword);

  const user = new User({ username, email, password: hashedPassword });
  await user.save();
  res.status(201).json({ message: "user created", user });
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user)
    return res.status(404).json({
      message: "user not found make account first",
    });
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch)
    return res.status(400).json({ message: "password not matched" });

  //token assignment
  const token = jwt.sign(
    {
      userId: user._id,
      email: user.email,
      role: "admin",
    },
    "Vikas123",
  );
  res.cookie("jwt-token", token, {
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000,
    sameSite: true,
    secure: true,
  });
  // console.log(token);
  res.status(200).json({ message: "login successfull", token });
});
//token middleware...
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token || !token.startsWith("Bearer ")) {
    return res.status(401).json({ message: "token is not valid or availble" });
  }
  // token=Bearer asdfghasdfjafsfsdfjsdf
  const tokenValue = token.split(" ")[1];
  try {
    const isVerified = jwt.verify(tokenValue, "Vikas123");
    req.user = isVerified;
    next();
  } catch (err) {
    return res.status(401).json({ message: "invalid token" });
  }
};
app.get("/users",verifyToken, async (req, res) => {
  console.log(req.user.role)
  // if(req.user.role==="admin")
  const users = await User.find();
  if (!users)
    return res.status(404).json({
      message: "no users found",
    });

  res.status(200).json({ message: " All users fetched", users });
});

app.put("/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { username, email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.findByIdAndUpdate(
      id,
      { username, email, password: hashedPassword },
      { new: true },
    );

    res.status(200).json({ message: "user updated", user });
  } catch (err) {
    res.status(500).json({ message: "something wents wrong" });
  }
});

app.delete("/users/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findByIdAndDelete(id);

    res.status(200).json({ message: "user deleted", user });
  } catch (err) {
    res.status(500).json({ message: "something wents wrong" });
  }
});

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
