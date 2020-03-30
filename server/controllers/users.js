const _ = require("lodash");
const bcrypt = require("bcrypt");
const { Validate, Users } = require("../models/user");
const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
const config = require("config");
const jwt = require("jsonwebtoken");

// creating route for users

const registerUser = async (req, res) => {
  //validatea req.body

  const { error } = Validate(req.body);
  if (error) {
    res.status("400").send(error.details[0].message);
  }

  //check if user exist using email/username
  let username = await Users.findOne({ username: req.body.username });
  if (username) return res.status(404).send("User with username Already exist");

  let email = await Users.findOne({ email: req.body.email });
  if (email) return res.status(404).send("User with email  Already exist");

  //create new user

  let user = new Users({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    username: req.body.username,
    email: req.body.email,
    isAdmin: req.body.isAdmin,
    phoneNumber: req.body.phoneNumber,
    password: req.body.password,
    isVerified: false
  });

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  user = await user.save();

  const token = user.generateAuthToken();

  res
    .header("x-user-token", token)
    .send(_.pick(user, ["_id", "name", "email", "password"]));

  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "femoxmed@gmail.com",
      pass: "omotayo123*"
    },
    tls: {
      rejectUnauthorized: false
    }
  });

  let mailOptions = {
    from: "femoxmed@gmail.com",
    to: "osarzeh@gmail.com",
    subject: "Verify your Email Address",
    text: `
        Click the link to verify your email address
        
        
        /api/user/confirmation/${token}`
  };

  transporter.sendMail(mailOptions, function(error, info) {
    if (error) {
      console.log("why email fail:", error);
      //delete saved data
    } else console.log(info);
  });
};

// Account Confirmation
const getUser = async (req, res) => {
  const token = req.params.id;
  console.log(token);

  if (!token) {
    res.status(401).send("Access Denied.No token Found");
    return;
  }

  const decode = await jwt.verify(token, config.get("pzPrivateKey"));
  req.user = decode;

  const userVerified = await Users.findById(req.user._id);
  console.log(userVerified.email);
  if (userVerified) {
    await Users.findByIdAndUpdate(
      userVerified._id,
      { isVerified: true },
      { new: true }
    );

    res.send("User verified");
  }
};

const getAuthenticatedUser = async (req, res) => {
  const token = req.header("xUserToken");
  if (!token) return res.status(403).send("ACCESS DENIED");
  try {
    const decode = jwt.verify(token, config.get("pzPrivateKey"));
    let user = decode;
    res.send(Users.findById(user._id));
  } catch (error) {
    res.status(401).send(`${error}'UNAUTHORISED ACCESS`);
  }
};

module.exports = {
  registerUser,
  getUser,
  getAuthenticatedUser
};
