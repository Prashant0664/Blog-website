import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BsDownload, BsHeartFill, BsThreeDotsVertical } from "react-icons/bs"
import { Link, useNavigate } from "react-router-dom";
import { toast } from 'react-hot-toast';
import Popup from 'reactjs-popup';
import { RWebShare } from "react-web-share";
import { decreastLike, deletelikes, likes, increaseLike, bookmark, deletebookmark, deletepost, checkbookmark, checklikes, } from "../../../helpers";
import { CiBookmark, CiHeart } from "react-icons/ci";
import { BsFillBookmarkFill } from "react-icons/bs";
function PostCard({ post, type }) {
  const { user } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();
  const notify = (notice) => toast({ notice });
  const [book, setbook] = React.useState(false);
  const [heart, setheart] = useState(false);
  const [menus, showmenu] = React.useState(false);
  const [sbook, setsbook] = React.useState(true);
  const [sbook2, setsbook2] = React.useState(true);
  // console.log(post); .
  const utcTimeString = (post && post.createdAt)?post.createdAt:"N/A";
  const date = new Date(utcTimeString);
  const localTimeString = date.toLocaleDateString();
  const navigate = useNavigate()
  React.useEffect(() => {
    x();
  }, [])
  const x = async () => {
    try {
      const checkbook = await checkbookmark(post._id, user.id);
      if (checkbook.msg === "ok") {
        setbook(true);
        setsbook(true);
        setsbook2(false);
      }
      else{
        setsbook(false);

      }
      const checklike = await checklikes(post._id, user.id);
      if (checklike.msg === "ok") {
        setheart(true);
      }
    } catch (error) {
      // console.log(error);
    }
  }
  const navigateToArticle = () => {
    navigate(`/article/${post._id}`)
  }
  const handleDown = () => {
    navigate(`/article/${post._id}`)
  }
  const handleheart = async () => {
    try {
      await increaseLike(post._id);
      await addheart();
      user.likes.push(post._id);
      dispatch({ type: "LIKE", payload: user.likes });
      return;
    } catch (error) {
      // console.log(error);
      alert("ERROR on likening");
      return;
    }
  }
  const editposts = async () => {
    navigate(`/edit/${post._id}`)
  }
  const addheart = async () => {
    try {
      const data = await likes(
        post._id,
        user.id
      )
      if (data.msg === "exists") {
        setheart(true);
        notify("Liked already")
      }
      else if (
        data.msg === "ok"
      ) {
        notify("liked")
        setheart(true);
      }
      else {
        notify("An Error Occurred while likening")
      }
    } catch (error) {
    }
  }
  const handleheartfalse = async () => {
    try {
      await decreastLike(post._id);
      await removeheart();
      setheart(false);
      return;
    } catch (error) {
      // console.log(error);
      alert("ERROR on likening");
      return;
    }
  }
  const removeheart = async () => {
    try {
      const data = await deletelikes(
        post._id,
        user.id
      )
      if (data.msg === 'deleted') {

      }
      else {
        alert("ERROR OCCURRED");
      }
    } catch (error) {
      // console.log("ERROR REMOVING likes");
    }
  }
  const setbookmark = async () => {
    try {
      const data = await bookmark(
        post._id,
        user.id
      )
      if (data.msg === "exists") {
        notify("Bookmark Already Added")
      }
      else if (
        data.msg === "ok"
      ) {
        notify("Bookmark Added")
      }
      else {
        // console.log("error in bb");
        notify("An Error Occurred while Adding Bookmark")
      }
      setbook(true);
      setsbook(true);
      setsbook2(false);
    } catch (error) {
      notify("Error adding bookmark");
    }
  }
  const dellbookmarl = async () => {
    try {
      const data = await deletebookmark(
        post._id,
        user.id
      )
      if (data.msg === 'deleted') {
        setbook(false);
        setsbook(false);
      }
      else {
        setsbook(false);
        alert("Does not exists");
        return;
      }
      setsbook2(true);


    } catch (error) {
      // console.log("ERROR REMOVING BOOKMARK");
    }
  }

  const deleteposts = async (postid) => {
    try {
      const data = await deletepost(postid, user.id)
      window.location.reload();
    } catch (error) {
      // console.log("error in deleting")
    }
  }
  return (
    <div className="item" >
      <div className="left">
        <img src={post && post.image?post.image:""} alt="" onClick={handleDown} />
      </div>
      <div className="right">
        <div className="title">
          <h3 onClick={navigateToArticle}>
            {post && post.title}
          </h3>
          {
            (!type || type != "powner") ?
              <>
                <div className="view_post">
                  {post && post.views} <svg xmlns="http://www.w3.org/2000/svg" fill="#000000" width="15px" height="15px" viewBox="-3.5 0 32 32" version="1.1">
                    <path d="M12.406 13.844c1.188 0 2.156 0.969 2.156 2.156s-0.969 2.125-2.156 2.125-2.125-0.938-2.125-2.125 0.938-2.156 2.125-2.156zM12.406 8.531c7.063 0 12.156 6.625 12.156 6.625 0.344 0.438 0.344 1.219 0 1.656 0 0-5.094 6.625-12.156 6.625s-12.156-6.625-12.156-6.625c-0.344-0.438-0.344-1.219 0-1.656 0 0 5.094-6.625 12.156-6.625zM12.406 21.344c2.938 0 5.344-2.406 5.344-5.344s-2.406-5.344-5.344-5.344-5.344 2.406-5.344 5.344 2.406 5.344 5.344 5.344z" />
                  </svg>

                  &nbsp;
                  |
                  &nbsp;
                  <div className="view_post">
                    {/* <div className="profile_data24 bluev"> */}
                    {post && post.likes ? post.likes : 0}
                    <div className="">{"" + ""}
                    </div>
                    &nbsp;
                    <BsHeartFill color="grey" size={11} />
                    {/* <div className="profile_data2"> */}
                  </div>
                </div>
              </>
              :
              <>

              </>
          }
        </div>
        <div className="description">

          <br className="hidesmall" />
          {post && post.description}
        </div>
        {(type && type === "powner")
          ?
          <>
            <div className=" profile_data">
              <div className=" view_post_profile bluev">
                {/* <div className="profile_data24 bluev"> */}
                {post && post.views} <svg color="blue" xmlns="http://www.w3.org/2000/svg" fill="blue" width="18px" height="18px" viewBox="-3.5 0 32 32" version="1.1">
                  <path d="M12.406 13.844c1.188 0 2.156 0.969 2.156 2.156s-0.969 2.125-2.156 2.125-2.125-0.938-2.125-2.125 0.938-2.156 2.125-2.156zM12.406 8.531c7.063 0 12.156 6.625 12.156 6.625 0.344 0.438 0.344 1.219 0 1.656 0 0-5.094 6.625-12.156 6.625s-12.156-6.625-12.156-6.625c-0.344-0.438-0.344-1.219 0-1.656 0 0 5.094-6.625 12.156-6.625zM12.406 21.344c2.938 0 5.344-2.406 5.344-5.344s-2.406-5.344-5.344-5.344-5.344 2.406-5.344 5.344 2.406 5.344 5.344 5.344z" />
                </svg>
                <div className="">{"" + ""}
                </div>
                {/* <div className="profile_data2"> */}
              </div>
              |
              <div className=" view_post_profile bluev">
                {/* <div className="profile_data24 bluev"> */}
                {post && post.likes ? post.likes : 0}
                <div className="">{"" + ""}
                </div>
                &nbsp;
                <BsHeartFill color="purple" size={13} />
                {/* <div className="profile_data2"> */}
              </div>
              |
              <div className="" style={{ color: "green" }} onClick={() => editposts(post._id)}> Edit</div>
              |
              <div className="red" onClick={() => deleteposts(post._id)}> Delete</div>
              {/* </div> */}
              {/* </div> */}
            </div>
            <RWebShare
              data={{
                text: "ALL BLOGS",
                url: `article/` + `${post && post._id?post._id:-1}`,
                title: `${post && post.title?post.title:"N/A"}`,
              }}
              onClick={() =>
                console.log("shared successfully!")
              }
            >
              <div className="sharepostmy">
                Share
              </div>
            </RWebShare>

          </>
          :
          <>
            <div className="profile_data">
              <div className="user_image">
                {!user ?
                  <Link to={`/auth`}>
                    <img className="imgscp" src={post && post.user ? post.user?.picture : ""} alt="" />
                  </Link>
                  :
                  (post && post.user && post.user._id) &&
                  <Link to={`/ProfileRedirect/${post && post.user._id?post.user._id:-1}`}>
                    <img className="imgscp" src={post.user?.picture} alt="" />
                  </Link>
                }
                {post && post.user ? <Link to={`/ProfileRedirect/${post?.user?._id}`}>
                  <img className="imgscp" src={post.user?.picture} alt="" />
                </Link> :
                  <></>}
              </div>
              <div className="user_middle">
                {!user ?
                  <span className="user_name"><Link to={`/auth`}>{(post && post.user && post.user.name )? post.user.name : "N/A"} </Link></span>
                  :
                  <span className="user_name"><Link to={`/ProfileRedirect/${post && post.user._id?post.user._id:-1}`}>{post && post.user.name} </Link></span>
                }
                <span className="date">{localTimeString}</span>
              </div>
              <div className="savePost">
                {!heart ? <CiHeart className='sizf' size={25} onClick={() => { if (!user) { navigate("/auth") } else handleheart() }} /> :
                  <svg onClick={() => { if (!user) { navigate("/auth") } else handleheartfalse() }} width="25px" height="25px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#000000" strokeWidth="0.648"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M2 9.1371C2 14 6.01943 16.5914 8.96173 18.9109C10 19.7294 11 20.5 12 20.5C13 20.5 14 19.7294 15.0383 18.9109C17.9806 16.5914 22 14 22 9.1371C22 4.27416 16.4998 0.825464 12 5.50063C7.50016 0.825464 2 4.27416 2 9.1371Z" fill="#ff00f7"></path> </g></svg>
                }
                {type === "main" ?
                  <>

                    {sbook2 && <CiBookmark className={`sizf`} size={25} onClick={() => {
                      if (!user) { navigate("/auth") } else { setbookmark(); setsbook2(false) }
                    }}
                    />
                    }
                    {!sbook2 && <BsFillBookmarkFill size={25} className="sizf"
                      onClick={() => { if (!user) { navigate("/auth") } else dellbookmarl(); setsbook2(true) }} />
                    }

                  </>
                  :
                  <></>
                }
                {/* hhhhkk */}
                {type && type === "profile_bookmark" ?
                  <>
                    {!sbook ?
                      <>
                        <CiBookmark className={`sizf`} size={25} onClick={() => {
                          setbookmark();
                        }}
                        />
                      </>
                      :
                      <>
                        <BsFillBookmarkFill size={25} className="sizf"
                          onClick={() => { dellbookmarl(); }} />

                      </>
                    }
                  </>
                  :
                  <></>

                }
                <div className="flex">
                  <BsThreeDotsVertical className="sizf" size={25} onMouseLeave={() => {
                    showmenu(false)
                  }} onMouseOver={() => { showmenu(true); }} />
                  <div className={menus ? 'menus2' : `hidden`} onMouseOver={() => { showmenu(true); }}
                    onMouseLeave={() => {
                      showmenu(false)
                    }}>
                    <RWebShare
                      data={{
                        text: "ALL BLOGS",
                        url: `article/` + `${post && post._id?post._id:-1}`,
                        title: `${post && post.title}`,
                      }}
                      onClick={() =>
                        console.log("shared successfully!")
                      }
                    >
                      <span style={{ display: "flex" }} className="shareprofile">

                        <div>

                          Share
                        </div>
                        <svg width="13px" height="13px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <rect width="24" height="24" fill="white"></rect> <path fillRule="evenodd" clipRule="evenodd" d="M14 6C14 3.79086 15.7909 2 18 2C20.2091 2 22 3.79086 22 6C22 8.20914 20.2091 10 18 10C16.7961 10 15.7164 9.46813 14.9831 8.62655L9.91209 11.1621C9.96969 11.4323 10 11.7126 10 12C10 12.2874 9.96969 12.5678 9.91208 12.838L14.9831 15.3735C14.9831 15.3735 16.7961 14 18 14C20.2091 14 22 15.7909 22 18C22 20.2091 20.2091 22 18 22C15.7909 22 14 20.2091 14 18C14 17.7126 14.0303 17.4322 14.0879 17.162L9.01694 14.6265C8.28363 15.4681 7.20393 16 6 16C3.79086 16 2 14.2091 2 12C2 9.79086 3.79086 8 6 8C7.20395 8 8.28367 8.53191 9.01698 9.37354L14.0879 6.83807C14.0303 6.56781 14 6.28744 14 6Z" fill="#323232"></path> </g></svg>
                      </span>
                    </RWebShare>

                  </div>
                </div>
                {/* <BsThreeDotsVertical size={23} className="sizf"/> */}

              </div>

              {/* <CiBookmark size={25} onClick={navigateToArticle}/> */}
              {/* <div className="savePost">
            <BsDownload size={23} className="downloadl" onClick={navigateToArticle} />
          </div> */}
            </div>
          </>}
      </div>
    </div>
  );
}

export default PostCard;
