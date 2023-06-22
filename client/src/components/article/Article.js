import React from "react";
import dompurify from "dompurify";
import { Link } from "react-router-dom";
import Footer from "../footer/Footer";
import * as htmlToImage from 'html-to-image';
import { toPng, toJpeg, toBlob, toPixelData, toSvg } from 'html-to-image';
import { jsPDF } from "jspdf";
import { BsDownload } from "react-icons/bs"
import Cookies from "js-cookie";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar";
import { BeatLoader } from "react-spinners";
import { getUser } from "../../helpers";
import {
  dataURItoBlob,
  uplaodImages,
  uploadProfilePicture,
  createcomment,
  getcomment
} from "../../helpers";

function Article({ post }) {

  const [dbPic, setDbPic] = useState("");
  const [dbname, setdbname] = useState("");
  const utcTimeString = post.createdAt;
  const { user } = useSelector((state) => ({ ...state }));
  // console.log(user);
  const date = new Date(utcTimeString);
  const [comment, setcomment] = React.useState("");
  const [scomment, setscomment] = React.useState(false);
  const [allc, setallc] = React.useState([]);
  const mm = (post.user.picture);
  const options = { month: "long", day: "numeric", year: "numeric" };
  const formattedDate = date.toLocaleDateString("en-US", options);
  const cleanHtml = dompurify.sanitize(post.content, { FORCE_BODY: true });
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
  useEffect(() => {
    const fetchMyProfile = async () => {
      try {
        const myprofile = await getUser(user.id);
        setDbPic(myprofile._doc.picture);
        setdbname(myprofile._doc.name);
      } catch (error) { }
    };
    fetchMyProfile();
  }, []);
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
      console.log(error)
    }
    // console.log(user.id);
    // console.log(post.user._id);


    // const data=
  }
  const loadcomm = async () => {
    try {
      const data = await getcomment(
        post.user._id
      );
      // console.log(data[data.length-1])
      if (data[data.length - 1].msg === 'ok') {
        data.pop();
        data.reverse();
        setallc(data);
        return;
      }
      else {
        // console.log(data)
        alert("Occurred");
        return;
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="article_wrapper" id="123k">
      <div className="article">
        <div className="user_info">
          <div className="user_image">
            <img src={post.user.picture} onClick={() => window.open(mm, "_blank")} alt="" />
          </div>
          <div className="user_side">
            <span>
              <Link to={`/ProfileRedirect/${post.user._id}`}>
                {post.user.name}
              </Link>
            </span>
            <span>"{post.user.about ? post.user.about : "User"}"</span>
          </div>
          <div className=""><BsDownload className="" onClick={() => { handleDown() }} /></div>
        </div>
        <div className="article_title" >{post.title}</div>
        <span className="post_date">
          {formattedDate.toUpperCase()} | {post.category.toUpperCase()}{" "}
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
                      // console.log(i);
                      const date = new Date(i.commentAt);
                      const dates=date.toLocaleDateString()
                      return (
                        <div className="com-all">
                          <div className="com-single">
                            <div className="side-com">
                              <div className="com-pic">
                                <img src={i.image} alt={i.image} className="com-img2" />
                              </div>
                              <div className="com-con">
                                <div className="com-nam">
                                  <div className="com-name-main">
                                    {i.name}
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
      <Footer />
    </div>
  );
}

export default Article;
