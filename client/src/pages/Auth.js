import { useState } from "react";
import { TfiEmail } from "react-icons/tfi";
import { CiLock } from "react-icons/ci";
import { TiUser } from "react-icons/ti";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";
import {
  checkifverify,
  sendmail,
  checkotpv
} from "../helpers/index"

function Auth() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [state, setState] = useState("Sign Up");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [otpv, cotpv] = useState("");
  const [vo, svo] = useState(false);
  const [cs, scs] = useState("");
  const userInfos = {
    email: "",
    password: "",
    name: "",
  };

  const [user, setUser] = useState(userInfos);
  const { email, password, name } = user;

  const handleRegisterChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async () => {
    var temail = email.toLowerCase()

    if (state === "Log In") {
      try {
        if (!temail || !password) {
          setError('All feilds are required !')
          return;
        }
        const data = await checkifverify(temail);
        if (data.msg === "ok") {

        }
        else if (
          data.msg === 'ne'
        ) {
          setError("Please Sign Up First ");
          return;
        }
        else {
          setError("Please Sign up and Verify Your Email ");
          return;
        }
      } catch (error) {
        // console.log(error);
      }
      logIn();
    } else {
      if (!name || !temail || !password) {
        setError('All feilds are required !')
        return;
      }
      if (vo === false) {
        setError('An OTP has been send to your mail for verification')
        const datas = await sendmail(temail, name);
        scs(true);
      }
    }
  };
  const checkotp = async () => {
    try {
      var temail = email.toLowerCase()

      const data = await checkotpv(temail, otpv);
    } catch (error) {
      setError('An Error Occurred')
      // console.log("cannot verify otp")
    }
  }
  const logIn = async () => {
    try {
      var temail = email.toLowerCase()
      const { data } = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/login`,
        {
          temail,
          password,
        }
      ); 
      setError('')
      setSuccess("Success !")
      setTimeout(() => {
        dispatch({ type: "LOGIN", payload: data });
        Cookies.set("user", JSON.stringify(data), { expires: 15 });
        navigate("/");
      }, 2000);
    } catch (error) {
      // console.log(error)
      setError(error.response.data.message);
    }
  };

  const signUp = async () => {
    try {
      var temail = email.toLowerCase()
      const { data } = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/register`,
        {
          name,
          temail,
          password,
        }
      );

      setError('')
      setSuccess(data.message)
      const { message, ...rest } = data;
      setTimeout(() => {
        dispatch({ type: "LOGIN", payload: rest });
        Cookies.set("user", JSON.stringify(rest), { expires: 15 });
        navigate("/");
      }, 2000);
    } catch (error) {
      setError(error.response.data.message);
    }
  };
  const verifyOTP = async () => {
    try {
      var temail = email.toLowerCase()
      const data = await checkotpv(temail, otpv);
      if (data.msg === 'ok') {
        setError("OTP Matched");
        signUp();
      }
      else {
        setError("OTP do not match");
      }
    } catch (error) {
      setError("ERROR OCCURRED!");
      // console.log("error in matching")
    }
  }
  const signUpWithGoogle = () => {
    window.open(`${process.env.REACT_APP_BACKEND_URL}/auth/google`, "_self");
  }

  return (
    <div className="containerzz">
      <div className="auth_wrapper">
        <div className="img">
          <img src="/sp.gif" alt="rfe" />
          <span>{state}</span>
        </div>
        <div className="login-cont">
          <div
            className="tab"
            style={{
              borderBottom: `${state === "Log In" ? "2px solid black" : ""}`,
              color: `${state === "Log In" ? "black" : ""}`,
            }}
            onClick={() => {
              setState("Log In");
              setError("")
            }}
          >
            Log In
          </div>
          <div
            className="tab"
            style={{
              borderBottom: `${state === "Sign Up" ? "2px solid black" : ""}`,
              color: `${state === "Sign Up" ? "black" : ""}`,
            }}
            onClick={() => {
              setState("Sign Up");
              setError("")

            }}
          >
            Sign Up
          </div>
        </div>
        {state === "Log In" ? (
          <div>
            {/* <div className="social google">
              <img src="/google.jpg" alt="google" />
              <span onClick={() => signUpWithGoogle()} >Log in with Google</span>
            </div>
            <div className="social facebook">
              <img src="/Facebook.png" alt="facebook" />
              <span>Log in with Facebook</span>
            </div> */}
            <div className="social google">
              <img src="/google.jpg" alt="google" />
              {/* <GoogleOAuthProvider clientId={`${process.env.GOOGLE_CLIENT}`}>...</GoogleOAuthProvider>; */}
              <span onClick={() => signUpWithGoogle()}>Sign In with Google</span>
            </div>
          </div>
        ) : (
          <div>
            <div className="social google">
              <img src="/google.jpg" alt="google" />
              {/* <GoogleOAuthProvider clientId={`${process.env.GOOGLE_CLIENT}`}>...</GoogleOAuthProvider>; */}
              <span onClick={() => signUpWithGoogle()}>Sign Up with Google</span>
            </div>
          </div>
          
        )}
        {/* <span className="or">or</span> */}
        OR
        <form action="">
          {state === "Sign Up" ? (
            <div className="input">
              <TiUser size={16} />
              <input
                type="text"
                name="name"
                placeholder="Enter full name"
                value={name}
                onChange={handleRegisterChange}
              />
            </div>
          ) : (
            ""
          )}
          <div className="input">
            <TfiEmail size={14} />
            <input
              type="text"
              name="email"
              placeholder="Enter email"
              value={email}
              onChange={handleRegisterChange}
            />
          </div>
          <div className="input">
            <CiLock size={16} />
            <input
              type="password"
              name="password"
              placeholder="Enter password"
              value={password}
              onChange={handleRegisterChange}
            />
          </div>
          {(cs) && state === "Sign Up" ?
            <div className="input">
              <input
                type="number"
                name="OTP"
                placeholder="OTP"
                value={otpv}
                onChange={(e) => { cotpv(e.target.value) }}
              />
            </div>
            : <></>}
        </form>
        {error && <span className="errorValidation" >{error}</span>}
        {success && <span className="RegisterSuccess" >{success}</span>}
        {state === "Sign Up" ? (
          <div className="dilougue">
            By signing up, you agree to our <b>terms of service</b> and
            <b>privacy policy</b>. No credit card required.
          </div>
        ) : (
          <div className="forget">
            <Link to="/resetPassword">Don't remember your password?</Link>
          </div>
        )}
        {(cs) && state === "Sign Up" ?
          <div className="footer" onClick={verifyOTP}>
            {state === "Sign Up" ? "Verify OTP" : "LOG IN"}
          </div>
          :
          <div className="footer" onClick={handleSubmit}>
            {state === "Sign Up" ? "SIGN UP FOR FREE" : "LOG IN"}
          </div>
        }
      </div>
    </div>
  );
}

export default Auth;
