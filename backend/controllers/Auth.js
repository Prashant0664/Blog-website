const { validateEmail, validateLength } = require("../helper/validation");
const User = require("../models/User");
const Post = require("../models/Post");
const bcrypt = require("bcrypt");
const { generateToken } = require("../helper/token");
const Code = require('../models/Code');
const { sendResetCode } = require("../helper/mail");
const { sendReportMail } = require("../helper/reportmail");
const generateCode = require("../helper/gen_code");
const keys = require("../config/keys");


const CLIENT_URL = `${keys.FRONTEND_URL}`;
// const CLIENT_URL = "https://allblogapp-project.vercel.app";


exports.google_auth = async (req, res) => {
    try {
        res.redirect('/');
    } catch (error) {
        // console.log(error);
        return res.status(400).json({ msg: "Bad Request" })
    }
}

exports.google_auth_callback = async (req, res) => {
    try {
        // res.redirect(CLIENT_URL);
    } catch (error) {
        // console.log(error);
        return res.status(400).json({ msg: "Bad Request" })
    }
}

