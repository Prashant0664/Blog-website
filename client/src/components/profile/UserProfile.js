import Cookies from "js-cookie";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../Navbar";
import { BeatLoader } from "react-spinners";
import { getUser } from "../../helpers";
import { PuffLoader } from "react-spinners";
import { Link, useNavigate } from "react-router-dom";
import PostCard from "../home/post/PostCard";
import {
  dataURItoBlob,
  uplaodImages,
  uploadProfilePicture,
  getfollowercount,
  getfollowingcount,
  showbookmarks,
  getallpostdata,
  showmyposts,
  fetchfollowing,
  changeabout,
  getallLikes,
  getallBookmarks,
  showLikemarks
  // getfollowingcount,
} from "../../helpers";
import "./userprofile.css";
import Footer from "../footer/Footer";
import InfiniteScroll from "react-infinite-scroll-component";

function UserProfile() {
  const navigate = useNavigate();
  const { user } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();
  const img_ref = useRef();
  const [image, setimage] = useState("");
  const [about, setAbout] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [dbPic, setDbPic] = useState("");
  const [folc, setfollc] = useState(0);
  const [folcd, setfollcd] = useState(0);
  const [books, setbooklist] = useState([]);
  const [likedp, setlikedp] = useState([]);
  const [sb, ssb] = useState(false);
  const [sbl, ssbl] = useState(false);
  const [posts, setpostlist] = useState([]);
  const [sp, ssp] = useState(false);
  const [rawDbAbout, setrawDbAbout] = useState("");
  const [view, setview] = useState("");
  const [follow1, setfollow1list] = useState([]);
  const [sf, ssf] = useState(false);
  const [dbAbout, setDbAbout] = useState("");
  const [bookmarkmap, setbookmarkmap] = useState(new Set());

  useEffect(() => {
    const fetchMyProfile = async () => {
      try {
        const myprofile = await getUser(user.id);
        setDbPic(myprofile._doc.picture);
        setrawDbAbout(myprofile._doc.about);
        setDbAbout(myprofile._doc.about);
        setAbout(myprofile._doc.about);
        const data = await getfollowercount(user.id);
        const data2 = await getfollowingcount(user.id);
        setfollcd(data2.data.msg);
        setfollc(data.data.msg);
      } catch (error) {
        // console.log("error in profile", error)
      }
    };
    fetchMyProfile();
  }, []);
  const handlebook = async () => {
    try {
      const data = await showbookmarks(user.id);

      setbooklist(data.data.msg);
    } catch (error) {
      // console.log("error in showbookmarks")
    }
  }
  const handlelike = async () => {
    try {
      const data = await showLikemarks(user.id);

      setlikedp(data.data.msg);
    } catch (error) {
      // console.log(error);
      // console.log("error in hearting fetching")
    }
  }
  const handlefoll = async () => {
    try {
      const data = await fetchfollowing(user.id);
      if (data.msg && data.msg.length > 0) {
        setfollow1list(data.msg)
      }
      else {
        setfollow1list([]);
      }
      ssf(!sf);
    } catch (error) {
      // console.log(error);
      // console.log("error in fetching followers")
    }
  }

  const handleposts = async () => {
    try {

      // const data=3033
      const data = await showmyposts(user.id);
      setpostlist(data.msg);
      ssp(true);
    }
    catch (err) {
      // console.log(err);
    }
  }
  const handlePhotoChange = (e) => {
    if (e.target.files.length) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = function (readerEvent) {
        setimage(readerEvent.target.result);
        setError("");
      };
    }
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      if (!image && !about) {
        return;
      }
      if (!image) {
        const data = await changeabout(about, user.id);
        if (data) {

        }
        window.location.reload();
        navigate("/profile")
        return;
      }
      if (!about) {
        setAbout(rawDbAbout)
      }
      if (!image || !about) {
        setError("Add image and tell something about yourself");
        return;
      } else setError("");
      if (about.length > 120) {
        setError("Maximam 120 character is allowed");
        return;
      } else setError("");
      if (image !== "") {
        setLoading(true);
        const path = `${user.name}/profile_image`;
        const img = dataURItoBlob(image);
        let formData = new FormData();
        formData.append("path", path);
        formData.append("file", img);
        const profile_img = await uplaodImages(formData, user.token);
        const data = await uploadProfilePicture(
          profile_img[0].url,
          about,
          user.token
        );
        Cookies.set(
          "user",
          JSON.stringify({
            ...user,
            picture: profile_img[0].url,
            about: data.about,
          })
        );
        dispatch({ type: "UPDATEPICTURE", payload: data });
      }
      window.location.reload();
      navigate("/profile");
    } catch (error) {
      setLoading(false);
      setError(error.response.data.message);
    }
  };

  const navigateToArticle = async (id) => {
    try {
      const data = await getallpostdata(id);
      var ooo = data.data.msg
      navigate('/article', { state: { ooo } })

    } catch (error) {
      // console.log("error in linkbook")
    }

  }
  console.log(image,"imagee")
  return (
    <div className="profile_container">
      <Navbar />
      <div className="profile">
        <div className="profile-photo">
          <div className="preview_img">
            {dbPic ? <img src={dbPic} referrerPolicy="no-referrer"/> : <img src={image} referrerPolicy="no-referrer"/>}
          </div>
        </div>
        <div className="image_button">
          <button
            onClick={() => {
              img_ref.current.click();
              setDbPic("");
            }}
          >
            Change or Add an Image
          </button>
        </div>
        <form
          onSubmit={handleSubmit}
          method="post"
          encType="multipart/form-data"
        >
          <input
            ref={img_ref}
            type="file"
            id="photo-upload"
            accept="image/*"
            onChange={handlePhotoChange}
            hidden
          />
          <label className="hreffor" htmlFor="about">About Me:</label>
          {dbAbout ? (
            <div className="about_me">
              {dbAbout}
            </div>
          ) : (
            <textarea
              id="about"
              name="about"
              rows="5"
              value={about}
              placeholder='write something...'
              onChange={(e) => {
                setAbout(e.target.value);
                setDbAbout(null);
              }}
            ></textarea>
          )}
          {error && <span className="my_profile_error" >{error}</span>}
          <div className="change_about" onClick={() => { setDbAbout(''); setAbout(dbAbout) }} >Change Bio</div>
          <button className="jenc" disabled={loading} type="submit">
            {loading ? <BeatLoader size={10} /> : "Save"}
          </button>
        </form>
      </div>
      <div className="follpage">
        <div className="following">
          Following: {folcd}
        </div>
        <div className="follower">
          Followers: {folc}
        </div>
      </div>
      <div className="profile-sub">
        <div className="bookmark-main">
          <h1 className="heading1 sm" onClick={() => { handlelike(); ssbl(true); }}>Liked Posts:</h1>
          <hr />
          {
            sbl ?
              (likedp.length === 0) ? (<div className="ssm">No Liked Posts</div>) : [1].map((dat) => {

                return (
                  <InfiniteScroll
                    dataLength={1}
                    // next={x}
                    hasMore={false}
                    loader={
                      <div className="loader-container">
                        <PuffLoader color="#000" size={8} className="loader" />
                      </div>
                    }
                    endMessage={
                      likedp.length && (
                        <p style={{ textAlign: "center", marginTop: "10px" }}>
                          <b>No More Liked Posts!</b>
                        </p>
                      )
                    }
                  >
                    {likedp && likedp.length === 0 ? (
                      <div className="post_loader">
                        <PuffLoader color="black" />
                      </div>
                    ) : (
                      <div className="posts_container">
                        {likedp.map((post, i) => {

                          return <PostCard post={post} key={i} type={"profile_bookmark"} />;
                        })}
                      </div>
                    )}
                  </InfiniteScroll>
                )
              })


              : <div className="ssm">Click above to show Liked posts</div>
          }


        </div>

        <div className="bookmark-main">
          <h1 className="heading1 sm" onClick={() => { handlebook(); ssb(true); }}>Bookmarks:</h1>
          <hr />
          {
            sb ?
              (!books || books.length === 0 || !books[0].user || !books[0].user._id) ? (<div className="ssm">No Bookmarks</div>) : [1].map((dat) => {

                return (
                  <InfiniteScroll
                    dataLength={1}
                    // next={x}
                    hasMore={false}
                    loader={
                      <div className="loader-container">
                        <PuffLoader color="#000" size={8} className="loader" />
                      </div>
                    }
                    endMessage={
                      books.length && (
                        <p style={{ textAlign: "center", marginTop: "10px" }}>
                          <b>No More BookMarks!</b>
                        </p>
                      )
                    }
                  >
                    {books && books.length === 0 ? (
                      <div className="post_loader">
                        <PuffLoader color="black" />
                      </div>
                    ) : (
                      <div className="posts_container">
                        {books.map((post, i) => {

                          if (!books || !books[0].user || !books[0].user._id || false) {
                            return <>
                              Loading...
                            </>
                          }
                          else {
                            return <PostCard post={post} key={i} type={"profile_bookmark"} />;
                          }
                        })}
                      </div>
                    )}
                  </InfiniteScroll>
                )
              })


              :
              <div className="ssm">Click above to show bookmark</div>
          }
        </div>

        <div className="bookmark-main">
          <h1 className="heading1 sm" onClick={() => handleposts()}>Your Posts</h1>
          <hr />

          {
            sp ?
              (posts.length === 0 || !posts) ? (<div className="ssm">You have not uploaded any posts!</div>) : [1].map((dat) => {

                return (
                  <InfiniteScroll
                    dataLength={1}
                    // next={x}
                    hasMore={false}
                    loader={
                      <div className="loader-container">
                        <PuffLoader color="#000" size={8} className="loader" />
                      </div>
                    }
                    endMessage={
                      posts.length && (
                        <p style={{ textAlign: "center", marginTop: "10px" }}>
                          <b>No More posts!</b>
                        </p>
                      )
                    }
                  >
                    {posts && posts.length === 0 ? (
                      <div className="post_loader">
                        <PuffLoader color="black" />
                      </div>
                    ) : (
                      <div className="posts_container">
                        {posts.map((post, i) => {

                          return <PostCard post={post} key={i} type={"powner"} />;
                        })}
                      </div>
                    )}
                  </InfiniteScroll>
                )
              }
              )



              : <div className="ssm">Click above to show Your Posts</div>
          }













        </div>


        <div className="bookmark-main ">
          <h1 className="heading1 sm" onClick={() => { handlefoll() }}>People You Follows:</h1>
          <hr />


          <div className="post-containerp22 pf22">

            {
              sf ?
                (follow1.length === 0 || !follow1) ? (<div className="ssm">You are not following anyone</div>) : follow1.map((dat) => {

                  return (<div className="profile_data2 uf22">
                    <div className="user_image uf2">
                      <Link to={`/ProfileRedirect/${dat.pid}`}>
                        <img className="imgscp2 uf2" src={dat.pic} alt="" />
                      </Link>
                    </div>
                    <div className="user_middle2 uf2">
                      <span className="user_name2 uf2"><Link to={`/ProfileRedirect/${dat.pid}`}><p className="blackfont uf2">{dat.name}</p></Link></span>
                    </div>
                  </div>)
                })
                : <div className="ssm">Click above to show Your following</div>
            }
          </div>

        </div>

      </div>
      <Footer />
    </div>
  );
}

export default UserProfile;

{/* <div className="post-containerp">
                  <div className="itemp" >
                    <div className="leftp">
                      <img className="leftimgp" src={dat.img} alt="" />
                    </div>
                    <div className="">
                      <div className="pointer">
                        <h3 onClick={() => navigateToArticle(dat.postid)}>
                          {dat.title}
                        </h3>
                      </div>
                      <div className="description">
                        {dat.desc}

                      </div>

                      <div className="profile_data24 bluev">
                        <div className=" view_post_profile bluev">
                          {dat.view} <svg color="blue" xmlns="http://www.w3.org/2000/svg" fill="blue" width="18px" height="18px" viewBox="-3.5 0 32 32" version="1.1">
                            <path d="M12.406 13.844c1.188 0 2.156 0.969 2.156 2.156s-0.969 2.125-2.156 2.125-2.125-0.938-2.125-2.125 0.938-2.156 2.125-2.156zM12.406 8.531c7.063 0 12.156 6.625 12.156 6.625 0.344 0.438 0.344 1.219 0 1.656 0 0-5.094 6.625-12.156 6.625s-12.156-6.625-12.156-6.625c-0.344-0.438-0.344-1.219 0-1.656 0 0 5.094-6.625 12.156-6.625zM12.406 21.344c2.938 0 5.344-2.406 5.344-5.344s-2.406-5.344-5.344-5.344-5.344 2.406-5.344 5.344 2.406 5.344 5.344 5.344z" />
                          </svg>
                        <div className="bluev">{dat.view + " "}
                           | 
                        </div>
                        <div className="profile_data2">
                          <div className="red" onClick={() => deleteposts(dat.postid)}> Delete</div>
                          </div>
                        </div>
                      </div> 
                         </div> 
                        ) 
                      </div> */}