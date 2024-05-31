import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { BsDownload } from "react-icons/bs"
import { Link, useNavigate } from "react-router-dom";

function PostCard({ post }) {
  const { user } = useSelector((state) => ({ ...state }));
  // console.log(post);
  const utcTimeString = post.createdAt;
  const date = new Date(utcTimeString);
  const localTimeString = date.toLocaleDateString();
  const navigate = useNavigate()
  const navigateToArticle = () => {
    navigate('/article', { state: { post } })
  }
  const handleDown = () => {
    navigate('/article', { state: { post } }) 
  }
  return (
    <div className="item" >
      <div className="left">
        <img src={post.image} alt="" onClick={handleDown}/>
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
            {!user?
            <Link to={`/auth`}>
            <img className="imgscp" src={post.user?.picture} alt="" />
          </Link>
          :
          <Link to={`/ProfileRedirect/${post.user._id}`}>
              <img className="imgscp" src={post.user?.picture} alt="" />
            </Link>
              }
          </div>
          <div className="user_middle">
            {!user?
            <span className="user_name"><Link to={`/auth`}>{post.user.name} </Link></span>
            :
            <span className="user_name"><Link to={`/ProfileRedirect/${post.user._id}`}>{post.user.name} </Link></span>
            }
            <span className="date">{localTimeString}</span>
          </div>
          <div className="savePost">
            {/* <CiBookmark size={25} onClick={navigateToArticle}/> */}
            <BsDownload size={23} className="downloadl" onClick={navigateToArticle}/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostCard;
