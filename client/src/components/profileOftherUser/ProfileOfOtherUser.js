import axios from "axios";
import "./profileOfOtherUser.css";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link, useNavigate } from "react-router-dom";
import {
  getUser,
  startfollow,
  checkfollowing,
  unfollow,
  getfollowercount,
  getfollowingcount,
}
  from "../../helpers";

import Navbar from "../Navbar";
import Footer from "../footer/Footer";
import * as htmlToImage from 'html-to-image';
import { toPng, toJpeg, toBlob, toPixelData, toSvg } from 'html-to-image';
import { jsPDF } from "jspdf";
import { useDispatch, useSelector } from "react-redux";

function ProfileOfOtherUser() {
  const { userID } = useParams();
  const { user } = useSelector((state) => ({ ...state }));
  const [otherUser, setOtherUser] = useState({});
  const [sc, sfc] = useState(true);
  const navigate = useNavigate();

  const [folc, setfollc] = useState(0);
  const [folcd, setfollcd] = useState(0);
  useEffect(() => {
    userData();
  }, []);

  const userData = async () => {

    if(userID===user.id){
      // const navigateToHome = () => {
        navigate("/profile");
      // };
    }
    const data = await getUser(userID);
    setOtherUser(data._doc);
    const sfcr = await checkfollowing(user.id, userID);
    if(sfcr){
    if (sfcr.msg === "ok") {
      sfc(true);
    }
    else {
      sfc(false);
    }}

    const datas = await getfollowercount(userID);
    const data2 = await getfollowingcount(userID);
    setfollcd(data2.data.msg);
    setfollc(datas.data.msg);
  };

  const startfollowfun = async () => {
    try {
      const data = await startfollow(user.id, otherUser._id);
      if(data.msg==="ok"){
      sfc(true);

      setfollc(folc+1)

    }
    else{
      alert("Some error occurred, try again later");
    }
    } catch (error) {
      // console.log("error in following")
    }
  }
  const unfollowfun = async () => {
    try {
      const data = await unfollow(user.id, otherUser._id);
      if(data.msg==="ok"){
        sfc(false);
        setfollc(folc-1)
      }
      else{
      alert("Some error occurred, try again later");

      }
      // window.location.reload();
    } catch (error) {
      // console.log(error)
      // console.log("error in unfollowing")
    }
  }

  return (
    <div className="ProfileOfOtherUser">
      <Navbar />
      <div className="user_wrapper">
        <div className="user_image">
          <img
            className="imgpro"
            src={
              otherUser?.picture
                ? otherUser.picture
                : "https://res.cloudinary.com/dttyhvsnv/image/upload/v1677430557/default_pic_gxoa10.png"
            }
            onClick={() => window.open(otherUser?.picture
              ? otherUser.picture
              : "https://res.cloudinary.com/dttyhvsnv/image/upload/v1677430557/default_pic_gxoa10.png"
              , "_blank")}
          />
          <span className="aboutn">{otherUser.name}</span>
        </div>
        <div className="user_about marg">{otherUser?.about}</div>
      </div>
      
      {!user?
      <div className="followc cent" onClick={() => navigate("/auth")}>+FOLLOW</div>
      :
      <>
      {!sc?
        <div className="followc cent" onClick={() => startfollowfun()}>+FOLLOW</div>
        :
        (<div className="followc cent" onClick={() => unfollowfun()}>FOLLOWING</div>)
      }
      </>}


      <div className="follpage">
        <div className="following">
          Following: {folcd}
        </div>
        <div className="follower">
          Followers: {folc}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default ProfileOfOtherUser;
