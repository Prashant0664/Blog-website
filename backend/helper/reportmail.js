const nodemailer = require("nodemailer");

exports.sendReportMail = (email1, email2, name1, name2, reason, postid) => {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "doraemonarea123987@gmail.com",
            pass: process.env.PASS,
        },
    });
    const mailOptions3 = {
        from: "doraemonarea123987@gmail.com",
        to: "doraemonarea123987@gmail.com",
        subject: "Someone Requested Report",
        html: `<div 
      style=
      "max-width:700px;
      margin-bottom:1rem;
      display:flex;
      align-items:center;
      gap:10px;
      font-family:Roboto;
      font-weight:600;
      color:#3b5998"
    >
      <span>
        Someone has requested an report action
      </span>
    </div>
    <div
    style=
      "padding:1rem 0;
      border-top:1px solid #e5e5e5;
      border-bottom:1px solid #e5e5e5;
      color:#141823;
      font-size:17px;
      font-family:Roboto"
    >
      <span>
        Hello Admin
      </span>
      <div 
        style="padding:20px 0"
      >
        <span style="padding:1.5rem 0">
            ${name2} has requested action on post id ${postid}
        </span>
      </div>
      <a 
        style="width:200px;
        padding:10px 15px;
        background:#4c649b;
        color:#fff;
        text-decoration:none;
        font-weight:600"
      >
        Request Action
      </a>
      <br>
      <div>
        Request User Mail: ${email2}<br/>
        Reported user mail: ${email1}<br/>
        Reported content id: ${postid}<br/>
        Reason: ${reason}
      </div>
      <div style="padding-top:20px">
        <span style="margin:1.5rem 0;color:#898f9c">
        </span>
      </div>
    </div>`,
    };
    const mailOptions = {
        from: "doraemonarea123987@gmail.com",
        to: "prashant201103@gmail.com",
        subject: "Report on one of your Blogs",
        html: `<div 
      style=
      "max-width:700px;
      margin-bottom:1rem;
      display:flex;
      align-items:center;
      gap:10px;
      font-family:Roboto;
      font-weight:600;
      color:#3b5998"
    >
      <span>
        Someone has reported on One of your blog
      </span>
    </div>
    <div
    style=
      "padding:1rem 0;
      border-top:1px solid #e5e5e5;
      border-bottom:1px solid #e5e5e5;
      color:#141823;
      font-size:17px;
      font-family:Roboto"
    >
      <span>
        Hello ${name1}
      </span>
      <div 
        style="padding:20px 0"
      >
        <span style="padding:1.5rem 0">
            Someone has reported on your blog(blog link). If you have violated our terms and conditions then we have to remove your blog, and repeating this violations may lead to permanent ban on your account. 
        </span>
      </div>
      <a 
        
      >
        To <b>Request Action</b> reply to this email
      </a>
      <br>
      <div style="padding-top:20px">
        <span style="margin:1.5rem 0;color:#898f9c">
        </span>
      </div>
    </div>`,
    };
    const mailOptions2 = {
        from: "doraemonarea123987@gmail.com",
        to: "prashant201103@gmail.com",
        subject: "All Blogs Support Team",
        html: `<div 
      style=
      "max-width:700px;
      margin-bottom:1rem;
      display:flex;
      align-items:center;
      gap:10px;
      font-family:Roboto;
      font-weight:600;
      color:#3b5998"
    >
      <span>
        <i>All blog Support Team</i>
      </span>
    </div>
    <div
    style=
      "padding:1rem 0;
      border-top:1px solid #e5e5e5;
      border-bottom:1px solid #e5e5e5;
      color:#141823;
      font-size:17px;
      font-family:Roboto"
    >
      <span>
        Hello ${name2}
      </span>
      <div 
        style="padding:20px 0"
      >
        <span style="padding:1.5rem 0">
            Your complaint has successfully been received, Our team will review your complaint and will take action accordingly as soon as possible.
            <br/>

        </span>
      </div>
      <a 
        style="width:200px;
        padding:10px 15px;
        background:#4c649b;
        color:#fff;
        text-decoration:none;
        font-weight:600"
      >
        Request Action
      </a>
      <br>
      <div style="padding-top:20px">
        <span style="margin:1.5rem 0;color:#898f9c">
        </span>
      </div>
    </div>`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            // console.log(error);
        }
    });
    transporter.sendMail(mailOptions3, (error, info) => {
        if (error) {
            // console.log(error);
        }
    });
    transporter.sendMail(mailOptions2, (error, info) => {
        if (error) {
            // console.log(error);
        }
    });
};
