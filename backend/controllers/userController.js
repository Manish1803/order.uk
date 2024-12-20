const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// register user
exports.register = async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists! Please login" });
    }

    const salt = parseInt(process.env.SALT, 10) || 10;
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new User({
      name,
      phone,
      email,
      password: hashedPassword,
      photo: "https://i.pravatar.cc/200?u=499476",
    });

    await newUser.save();

    res.status(201).json({
      success: true,
      message: "User created successfully!",
      user: {
        id: newUser._id,
        name: newUser.name,
        phone: newUser.phone,
        email: newUser.email,
      },
    });
  } catch (error) {
    res.status(500).json({ message: `Something went wrong! ${error}` });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User does not exist!" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid credentials!" });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(200).json({
      message: "Login successful!",
      user: user,
      token,
    });
  } catch (error) {
    res.status(500).json({ message: `Something went wrong!: ${error}` });
  }
};

exports.validateToken = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "No token provided!" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }

    res.status(200).json({
      success: true,
      message: "Token is valid",
      user: {
        id: user._id,
        name: user.name,
        phone: user.phone,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    return res.status(401).json({ message: "Token validation failed!", error });
  }
};
