const { validateEmail, validateLength } = require("../helper/validation");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const { generateToken } = require("../helper/token");
const Code = require('../models/Code');
const { sendResetCode } = require("../helper/mail");
const generateCode = require("../helper/gen_code");

exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!validateLength(name, 6, 15)) {
      return res
        .status(400)
        .json({ message: "Enter name between 6 to 15 characters !" });
    }
    if (!validateEmail(email)) {
      return res.status(400).json({ message: "Please enter a valid email !" });
    }
  
    if (!validateLength(password, 6, 15)) {
      return res
        .status(400)
        .json({ message: "Enter password between 6 to 15 characters !" });
    }

    const check = await User.findOne({ email });
    if (check) {
      return res.status(400).json({
        message:
          "This email already exists,try again with a different email",
      });
    }

    const hashed_password = await bcrypt.hash(password, 10);

    const user = await new User({
      name,
      email,
      password: hashed_password,
    }).save();
    // console.log("999");
    const token = generateToken({ id: user._id.toString() }, "15d");
    res.send({
      id: user._id,
      name: user.name,
      picture: user.picture,
      token: token,
      message: "Register Success !",
    });
  } catch (error) {
    // console.log(error);
    return res.status(500).json({ message: error.message });
  }
};


exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message:
          "the email you entered is not registered.",
      });
    }
    // console.log("<<<<>>>>");
    const check = await bcrypt.compare(password, user.password);
    if (!check) {
      return res.status(400).json({
        message: "Invalid Credentials. Please Try Again.",
      });
    }
    const token = generateToken({ id: user._id.toString() }, "15d");
    // console.log("----");
    res.send({
      id: user._id,
      name: user.name,
      picture: user.picture,
      token: token,
    });
  } catch (error) {
    // console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
exports.uploadprofile = async (req, res) => {
  try {
    const { picture , about } = req.body;

    await User.findByIdAndUpdate(req.user.id, {
      picture: picture,
      about: about,
    });
    res.status(200).json({picture,about});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const user =  await User.findById(userId);
    const { password, ...otherdata } = user
    res.status(200).json(otherdata);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.findOutUser = async (req, res) => {
  try {
    const { email } = req.body;
    const user =  await User.find({email:email})
   if(user){
    res.status(200).json(user);
    // console.log("---")
  }else{
     res.status(200).json({message:"no such user exists"});
   }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.sendResetPasswordCode = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    await Code.findOneAndRemove({ user: user._id });
    const code = generateCode(5);
    const savedCode = await new Code({
      code,
      user: user._id,
    }).save();
    sendResetCode(user.email, user.name, code);
    return res.status(200).json({
      message: "Email reset code has been sent to your email",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.validateResetCode = async (req, res) => {
  try {
    const { email, code } = req.body;
    const user = await User.findOne({ email });
    const Dbcode = await Code.findOne({ user: user._id });
    if (Dbcode.code !== code) {
      return res.status(400).json({
        message: "Verification code is wrong!",
      });
    }
    return res.status(200).json({ message: "ok" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.changePassword = async (req, res) => {
  const { email, password } = req.body;
try {
  const cryptedPassword = await bcrypt.hash(password, 12);
  await User.findOneAndUpdate(
    { email },
    {
      password: cryptedPassword,
    }
  );
  return res.status(200).json({ message: "ok" });
  
} catch (error) {
  res.status(400).json({message:"AN ERROR OCCURRED, PLEASE TRY AGAIN LATER"})
}
};




