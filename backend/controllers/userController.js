import AsyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import { accessToken, refreshToken } from "../utils/generateToken.js";
import fs from "fs";

// @desc Register a new user
// @route POST /api/user/registerUser
// @access public
const registerUser = AsyncHandler(async (req, res) => {
  const { email, username, password } = req.body;
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(406);
    throw new Error("User already exists!");
  }
  const userNameAlreadyTaken = await User.findOne({ username });
  if (userNameAlreadyTaken) {
    res.status(406);
    throw new Error("username is already taken!");
  }

  const user = await User.create({
    username,
    email,
    password,
  });

  if (user) {
    res
      .cookie("rf", refreshToken(user.id), {
        httpOnly: true,
        // forces to use https
        secure: false,
        sameSite: "Strict",
      })
      .status(201)
      .json({
        _id: user.id,
        username: user.username,
        email: user.email,
        phone: user.phone,
        image: user.image,
        type: user.type,
        access: accessToken(user.id),
      });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// @desc LogIn a user
// @route POST /api/user/logIn
// @access public
const logInUser = AsyncHandler(async (req, res) => {
  const { emailOrUsername, password } = req.body;

  let user = await User.findOne({ username: emailOrUsername });

  user = await User.findOne({ email: emailOrUsername });

  if (user && (await user.matchPassword(password))) {
    res
      .cookie("rf", refreshToken(user.id), {
        httpOnly: true,
        // forces to use https
        secure: false,
        sameSite: "Strict",
      })
      .status(200)
      .json({
        _id: user.id,
        username: user.username,
        email: user.email,
        phone: user.phone,
        image: user.image,
        type: user.type,
        isAdmin: user.isAdmin,
        access: accessToken(user.id),
      });
  } else {
    res.status(401);
    throw new Error("Invalid credentials!");
  }
});

// @desc get user Info
// @route GET /api/user/userInfo
// @access Private
const loadUserInfo = AsyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    res.json({
      _id: user.id,
      username: user.username,
      email: user.email,
      phone: user.phone,
      image: user.image,
      type: user.type,
      isAdmin: user.isAdmin,
      access: accessToken(user.id),
    });
  } else {
    res.status(404);
    throw new Error("User Not Found!");
  }
});

// @desc remove httponly cookie
// @route GET /api/user/logout
// @access Private
const userLogOut = AsyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res
      .clearCookie("rf", {
        httpOnly: true,
        // forces to use https
        secure: false,
        sameSite: "Strict",
      })
      .end();
  } else {
    res.status(401);
    throw new Error("Not authorized person we gotcha ya :)");
  }
});

// @desc update user data
// @route PUT /api/user/userInfo
// @access Private
const updateUser = AsyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  var emailExists = null;

  req.body.email && (emailExists = await User.find({ email: req.body.email }));

  if (emailExists != req.body.email && emailExists) {
    res.status(406);
    throw new Error("That email can't be usable!");
  }

  if (user) {
    user.email = req.body.email || user.email;
    user.phone = req.body.phone || user.phone;
    user.type = req.body.type || user.type;
    if (req.file) {
      if (user.image) {
        fs.unlinkSync(`./${user.image}`);
      }
      user.image = req.file.path;
    }
    if (req.body.password !== "") {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser.id,
      username: updatedUser.username,
      email: updatedUser.email,
      phone: updatedUser.phone,
      image: updatedUser.image,
      isAdmin: updatedUser.isAdmin,
      type: updatedUser.type,
      access: accessToken(updatedUser.id),
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc delete user image
// @route DELETE /api/user/userImage
// @access Private
const deleteUserImage = AsyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    if (user.image) {
      fs.unlinkSync(`./${user.image}`);
    }
    user.image = "";

    const updatedUser = await user.save();
    if (updatedUser) {
      res.status(200).json({
        type: updatedUser.image,
      });
    } else {
      res.status(404);
      throw new Error("No image found");
    }
  }
});

// @desc delete user account
// @route DELETE /api/user/userInfo
// @access Private
const deleteUser = AsyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    if (user.image) {
      fs.unlinkSync(`./${user.image}`);
    }
    await user.remove();
    res
      .status(200)
      .clearCookie("rf", {
        httpOnly: true,
        // forces to use https
        secure: false,
        sameSite: "Strict",
      })
      .end();
  } else {
    res.status(404);
    throw new Error("User not found!");
  }
});

export {
  registerUser,
  logInUser,
  loadUserInfo,
  userLogOut,
  updateUser,
  deleteUserImage,
  deleteUser,
};
