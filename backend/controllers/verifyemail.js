const StatusCodes = require("http-status-codes");
const Verify = require("../models/emailverify")
require('dotenv').config();
const {sendVerifyCode} = require("../helper/mailverifymail")
const User = require("../models/User");
const generateCode = require("../helper/gen_code");
const checkotpv=async(req,res)=>{
    try {
        const { mail, otp } = req.body;
        const data = await Verify.findOne({ mail: mail });
        if (data) {
            if(data.otp==otp){
                return res.status(200).json({ msg: "ok" });
            }
            else{
                return res.status(200).json({ msg: "not" });
            }
        }
        else {
            return res.status(200).json({ msg: "not" });
        }
        // sendVerifyCode(mail, name, code);
    } catch (error) {
        // console.log(error)
        // console.log("error in mail send code");
        return res.status(400).json({ msg: "error in sending mail" });
    }
}
const sendmail = async (req, res) => {
    try {
        const { mail, name } = req.body;
        const code = generateCode(6);
        const data = await Verify.findOne({ mail: mail });
        if (data) {
            data.otp = code;
            data.mail = mail;
            await data.save();
        }
        else {
            const user = await Verify.create({
                mail: mail,
                otp: code,
            })
            await user.save();
        }
        // sendVerifyCode("prashant201103@gmail.com", name, code);
        sendVerifyCode(mail, name, code);
        return res.status(200).json({ msg: "ok" });
    } catch (error) {
        // console.log(error)
        // console.log("error in mail send code");
        return res.status(400).json({ msg: "error in sending mail" });

    }
}
const checkifverify=async(req,res)=>{

    try {
        const {mail}=req.body
        const data=await User.findOne({email:mail});
        if(!data){
        return res.status(200).json({msg:"ne"});
        }
        if(data.verify===true){
            return res.status(200).json({msg:"ok"});
        }
        else{
            return res.status(200).json({msg:"not"});

        }
    } catch (error) {
        return res.status(400).json({msg:"error"});
    }
}

const verifycode=async(req,res)=>{

    try {
        const {mail}=req.body
        const data=await User.findOne({email:mail});
        if(!data){
        return res.status(200).json({msg:"ne"});
        }
        if(data.verify===true){
            return res.status(200).json({msg:"ok"});
        }
        else{
            return res.status(200).json({msg:"not"});

        }
    } catch (error) {
        return res.status(400).json({msg:"error"});
    }
}

module.exports={sendmail,
    checkifverify,
    verifycode,
    checkotpv
}