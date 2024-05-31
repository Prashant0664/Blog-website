import React from "react";
import dompurify from "dompurify";
import { Link } from "react-router-dom";
import Footer from "../footer/Footer";
import * as htmlToImage from 'html-to-image';
import { jsPDF } from "jspdf";
import { CiBookmark, CiHeart } from 'react-icons/ci';
import { BsDownload, BsFillBookmarkFill, BsThreeDotsVertical } from "react-icons/bs"
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../../helpers";
import { toast, Toaster, ToastBar } from 'react-hot-toast';
import { useNavigate } from "react-router-dom";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import {
  checklikes,
  getarticle,
  decreastLike,
  increaseLike,
  bookmark,
  createcomment,
  getcomment,
  deletebookmark,
  checkbookmark,
  reportcontent,
  fetchprof,
  startfollow,
  checkfollowing,
  unfollow,
  increaseView,
  getView,
  likes,
  deletelikes,
  getLikes,
} from "../../helpers";

function Article({ post, __id }) {
  const navigate = useNavigate();
  const [dbPic, setDbPic] = useState("");
  const [sc, sfc] = useState(true);
  const [dbname, setdbname] = useState("");
  const utcTimeString = post.createdAt;
  const { user } = useSelector((state) => ({ ...state }));
  const date = new Date(utcTimeString);
  const [comment, setcomment] = React.useState("");
  const [book, setbook] = React.useState(false);
  const [menus, showmenu] = React.useState(false);
  const [scomment, setscomment] = React.useState(false);
  const [allc, setallc] = React.useState([]);
  const [formr, rform] = React.useState("");
  const [reportedata, setreported] = React.useState("Report");
  const [mm, setmm] = React.useState("");
  const options = { month: "long", day: "numeric", year: "numeric" };
  const formattedDate = date.toLocaleDateString("en-US", options);
  const cleanHtml = dompurify.sanitize(post.content, { FORCE_BODY: true });
  const [heart, setheart] = useState(false);
  const [view, setview] = useState("");
  const [likec, setlikec] = useState(0);

  useEffect(() => {
    const fetchMyProfile = async () => {
      try {
        while (!post) {

        }
        await increaseView(__id);
        const datasd = await getView(__id);
        setview(datasd.view)
        const datalikes = await getLikes(__id);
        setlikec(datalikes.likes);
        if (post && post.user && !post.user.name) {
          const prof = await fetchprof(post.user);
          post.user = prof
          post.user = {
            picture: prof.msg.picture,
            name: prof.msg.name,
            _id: prof.msg._id,
            about: prof.msg.about
          }
        }
        setmm(post.user.picture);
        const sfcr = await checkfollowing(user.id, post.user._id);
        if (sfcr.msg === "ok") {
          sfc(true);
        }
        else {
          sfc(false);
        }
        // const myprofile = await getUser(user.id);
        // setDbPic(myprofile._doc.picture);
        // setdbname(myprofile._doc.name);

        setDbPic(user.picture);
        setdbname(user.name);
        if (user) {
          const data = await checkbookmark(
            __id,
            user.id
          )
          const datalikes = await checklikes(
            __id,
            user.id
          )
          if (datalikes.msg === "ok") {
            setheart(true);
          }
          if (data.msg === 'ok') {
            setbook(true);
          }
        }


      } catch (error) {
        if (error.msg == "!article") {
          navigate("/404");
        }
        else if (error.msg == "!user") {
          navigate("/404");
        }
        else if (error.msg === "error") navigate("/404");
      }
    };
    fetchMyProfile();
  }, []);
  const handleDown = () => {
    htmlToImage.toPng(document.getElementById('123k'), { quality: 1.0 })
      .then(function (dataUrl) {
        var link = document.createElement('a');
        link.download = 'my-image-name.jpeg';
        const pdf = new jsPDF();
        const imgProps = pdf.getImageProperties(dataUrl);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
        pdf.addImage(dataUrl, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.save("ALLBlogs.pdf");
      });
  }

  const handleheart = async () => {
    try {
      await increaseLike(__id);
      // await 
      await addheart();
      return;
    } catch (error) {
      // console.log(error);
      alert("ERROR on likening");
      return;
    }
  }
  const addheart = async () => {
    try {
      const data = await likes(
        __id,
        user.id
      )
      if (data.msg === "exists") {
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
      // console.log("error in likening")
    }

  }
  const handleheartfalse = async () => {
    try {
      await decreastLike(__id);
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
        __id,
        user.id
      )
      // console.log(data)
      if (data.msg === 'deleted') {

      }
      else {
        alert("ERROR OCCURRED");
      }
    } catch (error) {
      // console.log("error REMOVING likes");
    }
  }
  const notify = (notice) => toast({ notice });
  const handle = async () => {
    if (comment.length <= 0 || comment.length >= 550) {
      alert("comment can only have between 0 to 551 characters");
      return;
    }
    try {
      const data = await createcomment(
        dbname,
        dbPic,
        comment,
        user.id,
        post.user._id
      );
      if (data.msg === "ok") {
        setcomment("")
        loadcomm();
        // GiConsoleController.log(error);
      }
      else {
        // alert(data.msg);
        return;
      }
    } catch (error) {
      // console.log(error)
    }
  }

  const setbookmark = async () => {
    try {
      const data = await bookmark(
        __id,
        user.id
      )
      if (data.msg === "exists") {
        notify("Bookmark Already Added")
      }
      else if (
        data.msg === "ok"

      ) {
        notify("Bookmark Added")
        setbook(true);
      }
      else {
        notify("An Error Occurred while Adding Bookmark")
      }
    } catch (error) {
      notify("Error adding bookmark");
    }
  }
  const dellbookmarl = async () => {
    try {
      const data = await deletebookmark(
        __id,
        user.id
      )
      if (data.msg === 'deleted') {
        // console.log("success")
        setbook(false);
      }
      else {
        alert("ERROR OCCURRED");
      }
    } catch (error) {
      // console.log("error REMOVING BOOKMARK");
    }
  }
  const Reports = async (e) => {
    e.preventDefault();
    try {
      const data = await reportcontent(
        __id,
        post.user._id,
        user.id,
        post.user.name,
        user.name,
        formr
      )
      if (data.msg === 'ok') {
        setreported("Reported");
      }
      else {
        setreported("Report")
      }
    } catch (error) {
      setreported("Report")
      // console.log("Error");
    }
  }
  const loadcomm = async () => {
    try {
      const data = await getcomment(
        post.user._id
      );
      if (data[data.length - 1].msg === 'ok') {
        data.pop();
        data.reverse();
        setallc(data);
        return;
      }
      else {
        alert("Occurred");
        return;
      }
    } catch (error) {
      // console.log(error);
    }
  }
  const startfollowfun = async () => {
    try {
      const data = await startfollow(user.id, post.user._id);
      sfc(true);
    } catch (error) {
      // console.log("error in following")
    }
  }
  const unfollowfun = async () => {
    try {
      const data = await unfollow(user.id, post.user._id);
      sfc(false);

    } catch (error) {
      // console.log(error)
      // console.log("error in unfollowing")
    }
  }
  if (post.user)
    return (
      <>
        <div className="article_wrapper" id="123k">
          <div className="article">
            <div className="user_info">
              <div className="user_image ">
                <img className="imgi" src={post.user.picture} onClick={() => window.open(mm, "_blank")} alt="" />
              </div>
              <div className="user_side">
                <span className="userni">
                  {!user ?
                    <Link to={`/auth`}>
                      {post.user.name}
                    </Link>
                    :
                    <Link to={`/ProfileRedirect/${post.user._id}`}>
                      {post.user.name}
                    </Link>
                  }
                </span>
                <span className="userdi"><p className="userdi">
                  "{post.user.about ? post.user.about : "User"}"
                </p>
                </span>
              </div>
              {!user ?
                <div className="kbj" onClick={() => { navigate("/auth") }}>Can't follow?</div>
                :
                <>
                  {!sc ?
                    (<div className="followc" onClick={() => startfollowfun()}>+Follow</div>)
                    :
                    (<div className="followc" onClick={() => unfollowfun()}>Following</div>)
                  }
                </>
              }
              {!user ?
                <div className="downloadi">
                  <BsDownload className="sizf" size={25} onClick={() => navigate("/auth")} />
                  {!heart ? <CiHeart className='sizf' size={25} onClick={() => navigate("/auth")} /> :
                    <svg onClick={() => navigate("/auth")} width="25px" height="25px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#000000" strokeWidth="0.648"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M2 9.1371C2 14 6.01943 16.5914 8.96173 18.9109C10 19.7294 11 20.5 12 20.5C13 20.5 14 19.7294 15.0383 18.9109C17.9806 16.5914 22 14 22 9.1371C22 4.27416 16.4998 0.825464 12 5.50063C7.50016 0.825464 2 4.27416 2 9.1371Z" fill="#ff00f7"></path> </g></svg>
                  }
                  {book ?
                    <BsFillBookmarkFill size={25} className="sizf"
                      onClick={() => navigate("/auth")} />
                    :
                    <CiBookmark className={`sizf`} size={25} onClick={() => navigate("/auth")}
                    />}

                  <div className="flex">
                    <BsThreeDotsVertical className="sizf" size={25} onMouseLeave={() => {
                      showmenu(false)
                    }} onMouseOver={() => { showmenu(true); }} />
                    <div className={menus ? 'menus' : `hidden`} onMouseOver={() => { showmenu(true); }}
                      onMouseLeave={() => {
                        showmenu(false)
                      }}>
                      <Popup trigger={<button className="buttonr">
                        <div className="menubox">
                          {reportedata}
                        </div>
                      </button>} modal>
                        <div className="modelbox">
                          <h1>Report</h1>
                          <hr />
                          <div className="myclassr">
                            <form className="myformclassr">
                              <input
                                className="formi"
                                placeholder="Enter reason of report here link copyright issue etc. (with detail if possible)"
                                type="text"
                                onChange={(e) => { rform(e.target.value) }}
                                value={formr}
                              />
                              <button onClick={() => navigate("/auth")}>Submit</button>
                            </form>
                          </div>
                        </div>
                      </Popup>
                    </div>
                  </div>
                  {/* <Popup trigger={<button> Trigger</button>} position="right center">
              <div>Popup content here !!</div>
            </Popup> */}

                </div>
                :
                <div className="downloadi">
                  <BsDownload className="sizf" size={25} onClick={() => { handleDown() }} />
                  {!heart ? <CiHeart className='sizf' size={25} onClick={() => handleheart()} /> :
                    <svg onClick={() => handleheartfalse()} width="25px" height="25px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#000000" strokeWidth="0.648"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M2 9.1371C2 14 6.01943 16.5914 8.96173 18.9109C10 19.7294 11 20.5 12 20.5C13 20.5 14 19.7294 15.0383 18.9109C17.9806 16.5914 22 14 22 9.1371C22 4.27416 16.4998 0.825464 12 5.50063C7.50016 0.825464 2 4.27416 2 9.1371Z" fill="#ff00f7"></path> </g></svg>
                  }
                  {book ?
                    <BsFillBookmarkFill size={25} className="sizf"
                      onClick={() => { dellbookmarl(); }} />
                    : <CiBookmark className={`sizf`} size={25} onClick={() => {
                      setbookmark();
                    }}
                    />}

                  <div className="flex">
                    <BsThreeDotsVertical className="sizf" size={25} onMouseLeave={() => {
                      showmenu(false)
                    }} onMouseOver={() => { showmenu(true); }} />
                    <div className={menus ? 'menus' : `hidden`} onMouseOver={() => { showmenu(true); }}
                      onMouseLeave={() => {
                        showmenu(false)
                      }}>
                      <Popup trigger={<button className="buttonr">
                        <div className="menubox">
                          {reportedata}
                        </div>
                      </button>} modal>
                        <div className="modelbox">
                          <h1>Report</h1>
                          <hr />
                          <div className="myclassr">
                            <form className="myformclassr">
                              <input
                                className="formi"
                                placeholder="Enter reason of report here link copyright issue etc. (with detail if possible)"
                                type="text"
                                onChange={(e) => { rform(e.target.value) }}
                                value={formr}
                              />
                              <button onClick={(e) => Reports(e)}>Submit</button>
                            </form>
                          </div>
                        </div>
                      </Popup>
                    </div>
                  </div>
                  {/* <Popup trigger={<button> Trigger</button>} position="right center">
                <div>Popup content here !!</div>
              </Popup> */}

                </div>
              }

            </div>
            <div className="article_title" >{post.title}</div>
            <span className="post_date">
              {formattedDate.toUpperCase()} | {post.category.toUpperCase()}{" "} | {view ? `${view}` + " views" : ""} | {likec ? `${likec}` + " likes" : `${likec} likes`}
            </span>
            <br />
            <div className="article_image">
              <img src={post.image} alt="post image" />
            </div>
            <div
              id="downid"
              className="article_content"
              dangerouslySetInnerHTML={{ __html: cleanHtml }}
            >

            </div>
            <br />
            <br />
            <hr />
            <div className="comment-main">
              <div className={scomment ? 'hidden' : `com-head`} onClick={() => { setscomment(true); loadcomm() }}>
                Show Comments
                <br />
              </div>
              <div className={scomment ? 'com-head' : `hidden`} onClick={() => { setscomment(false) }}>
                Comments:
                <br />
              </div>
              {scomment ?

                (!user ?
                  (
                    <div>
                      <b>
                        Signin to comment
                      </b>
                    </div>
                  ) :
                  <div>
                    <div className="add-com">
                      <form className="com-form">
                        <label className=""></label>
                        <textarea
                          className="com-inp"
                          placeholder="Add Comment... (NOTE: You will not be able to edit your comment once submitted!)"
                          value={comment}
                          onChange={(e) => { setcomment(e.target.value) }}
                        />
                        <button type="button" className="com-btn" onClick={handle}>Submit</button>
                      </form>
                    </div>

                    {allc.length == 0 ? <div className="">Be the First One to Comment</div>
                      :
                      <div>
                        {allc.map((i) => {
                          const date = new Date(i.commentAt);
                          const dates = date.toLocaleDateString()
                          return (
                            <div className="com-all">
                              <div className="com-single">
                                <div className="side-com">
                                  <div className="com-pic">
                                    <img src={i.image} alt={i.image} onClick={() => window.open(i.image, "_blank")} className="com-img2" />
                                  </div>
                                  <div className="com-con">
                                    <div className="com-nam">
                                      <div className="com-name-main">
                                        <Link to={`/ProfileRedirect/${i.commentBy}`}>
                                          {i.name}
                                        </Link>
                                      </div>
                                    </div>
                                    <div className="com-date">
                                      <div className="com-date-main">
                                        {dates}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="content-con">
                                  <div className="con-main-content">
                                    {i.comment}
                                  </div>
                                </div>
                              </div>
                            </div>
                          )
                        })}


                      </div>
                    }

                  </div>

                )
                :
                <div></div>
              }

            </div>
          </div>
          {/* <Toaster/> */}
          <Footer />
        </div>


      </>
    )
  else
    return (<>
      <br />
      <br />
      <br />
      <br />
      <div style={{ textAlign: 'center' }}>
        <h1 style={{ fontWeight: 'bold' }}>Loading</h1>
        <p style={{ fontSize: '24px' }}>You can comment, save, bookmark and download page</p>
      </div>
    </>)
}

export default Article;
