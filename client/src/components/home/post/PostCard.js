import React from "react";
import { CiBookmark } from 'react-icons/ci';
import { Link, useNavigate } from "react-router-dom";

import { BsDownload } from "react-icons/bs"
import * as htmlToImage from 'html-to-image';
import { toPng, toJpeg, toBlob, toPixelData, toSvg } from 'html-to-image';
import { jsPDF } from "jspdf";
function PostCard({ post }) {
  const utcTimeString = post.createdAt;
  const date = new Date(utcTimeString);
  const localTimeString = date.toLocaleDateString();

  const navigate = useNavigate()

  const navigateToArticle = () => {
    navigate('/article', { state: { post } })
  }
  const handleDown = () => {
    htmlToImage.toPng(document.getElementById('123k'), { quality: 1.0 })
    navigate('/article', { state: { post } })
  }

  return (
    <div className="item" >
      <div className="left">
        <img src={post.image} alt="" />
      </div>
      <div className="right">
        <div className="title">
          <h3 onClick={navigateToArticle}>
            {post.title}
          </h3>
        </div>
        <div className="description">
          {post.description}
        </div>
        <div className="profile_data">
          <div className="user_image">
            <Link to={`/ProfileRedirect/${post.user._id}`}>
              <img className="imgscp" src={post.user?.picture} alt="" />
            </Link>
          </div>
          <div className="user_middle">
            <span className="user_name"><Link to={`/ProfileRedirect/${post.user._id}`}>{post.user.name} </Link></span>
            <span className="date">{localTimeString}</span>
          </div>
          <div className="savePost">
            <CiBookmark size={25} />
            <BsDownload size={23} className="downloadl" onClick={navigateToArticle}/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostCard;
