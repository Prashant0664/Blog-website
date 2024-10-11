import React from "react";
import Breaker from "../components/home/breaker/Breaker";
import Posts from "../components/home/post/Posts";
import Navbar from "../components/Navbar";
import Card from "../components/home/card/Card";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useState } from "react";
import Footer from "../components/footer/Footer";
function HomePage({ user, category }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [mpost, setmpost] = useState(category);
  const [flag, setflag] = useState(false);
  const handleLoad = async () => {
    if (user === null || user === undefined) {
      await fetch(`${process.env.REACT_APP_BACKEND_URL}/login/success`, {
        method: "POST",
        credentials: "include",
        withCredentials: true,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,
        },
      })
        .then((data) => {
          if (data.status === 201) return data.json();
          throw new Error("Authentication Failed!");
        })
        .then((data) => {
          dispatch({ type: "LOGIN", payload: data });
          Cookies.set("user", JSON.stringify(data), { expires: 15 });
          navigate("/");
        })
        .catch((err) => {
          // console.log(err);
        });

    }
  };
  React.useEffect(() => {
    handleLoad();
  }, []
  )
  return (
    <div className="HomePage">
      <Navbar user={user} />
      <Card setmpost={setmpost} setflag={setflag} flag={flag} mpost={mpost} />
      <Breaker text='Featured Post' />
      <Posts category={category} />
      <Footer />
    </div>
  );
}

export default HomePage;
