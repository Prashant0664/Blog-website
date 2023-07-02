import Cookies from "js-cookie";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../Navbar";
import { BeatLoader } from "react-spinners";
import { getUser } from "../../helpers";
import { Link, useNavigate } from "react-router-dom";
import {
  dataURItoBlob,
  uplaodImages,
  uploadProfilePicture,
  getfollowercount,
  getfollowingcount,
  showbookmarks,
  getallpostdata,
  showmyposts,
  deletepost,
  fetchfollowing
  // getfollowingcount,
} from "../../helpers";
import "./userprofile.css";
import Footer from "../footer/Footer";

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
  const [sb, ssb] = useState(false);
  const [posts, setpostlist] = useState([]);
  const [sp, ssp] = useState(false);

  const [follow1, setfollow1list] = useState([]);
  const [sf, ssf] = useState(false);
  const [dbAbout, setDbAbout] = useState("");

  useEffect(() => {
    const fetchMyProfile = async () => {
      try {
        const myprofile = await getUser(user.id);
        setDbPic(myprofile._doc.picture);
        setDbAbout(myprofile._doc.about);
        const data = await getfollowercount(user.id);
        const data2 = await getfollowingcount(user.id);
        setfollcd(data2.data.msg);
        setfollc(data.data.msg);
      } catch (error) {
        console.log("Error in profile")
      }
    };
    fetchMyProfile();
  }, []);
  const handlebook = async () => {
    try {
      const data = await showbookmarks(user.id);
      setbooklist(data.data.msg);
    } catch (error) {
      console.log("error in showbookmarks")
    }
  }
  const handlefoll = async () => {
    try {
      const data = await fetchfollowing(user.id);
      if(data.msg && data.msg.length>0){
        setfollow1list(data.msg)
      }
      else{
        setfollow1list([]);
      }
      ssf(!sf);
      // console.log(data.msg)
    } catch (error) {
      console.log(error);
      console.log("error in fetching followers")
    }
  }
  const deleteposts = async (postid) => {
    try {
      const data = await deletepost(postid, user.id)
      window.location.reload();
    } catch (error) {
      console.log("error in deleting")
    }
  }

  const handleposts = async () => {
    try {
      // const data=3033
      const data = await showmyposts(user.id);
      setpostlist(data.msg);
      // console.log("0000",posts)
      ssp(true);
    }
    catch (err) {
      console.log(err);
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
      if (!image || !about) {
        setError("Add image and tell something about yourself");
        return;
      } else setError("");
      if (about.length > 120) {
        setError("Maximam 80 character is allowed");
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
      navigate("/");
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
      console.log("error in linkbook")
    }

  }
  return (
    <div className="profile_container">
      <Navbar />
      <div className="profile">
        <div className="profile-photo">
          <div className="preview_img">
            {dbPic ? <img src={dbPic} /> : <img src={image} />}
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
          <div className="change_about" onClick={() => setDbAbout('')} >Change Bio</div>
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
          <h1 className="heading1 sm" onClick={() => { handlebook(); ssb(true); }}>Bookmarks:</h1>
          <hr />



          {
            sb ?
              (books.length === 0) ? (<div className="ssm">No Bookmarks</div>) : books.map((dat) => {

                return (<div className="post-containerp">
                  <div className="itemp" >
                    <div className="leftp">
                      <img className="leftimgp" src={dat.img} alt="" />
                    </div>
                    <div className="">
                      <div className="pointer">
                        {/* <h3 onClick={""}> */}
                        <h3 onClick={() => navigateToArticle(dat.postid)}>
                          {dat.title}
                        </h3>
                      </div>
                      <div className="description">
                        {dat.desc}
                      </div>
                      <div className="profile_data2">
                        <div className="user_image">
                          <Link to={`/ProfileRedirect/${dat.userid}`}>
                            <img className="imgscp2" src={dat.imgp} alt="" onClick={() => window.open(dat.imgp, "_blank")} />
                          </Link>
                        </div>
                        <div className="user_middle2">
                          <span className="user_name2"><Link to={`/ProfileRedirect/${dat.userid}`}><p className="blackfont">{dat.name} </p></Link></span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>)
              })


              : <div className="ssm">Click above to show bookmark</div>
          }


        </div>

        <div className="bookmark-main">
          <h1 className="heading1 sm" onClick={() => handleposts()}>Your Posts</h1>
          <hr />

          {
            sp ?
              (posts.length === 0 || !posts) ? (<div className="ssm">You have not uploaded any posts!</div>) : posts.map((dat) => {

                return (<div className="post-containerp">
                  <div className="itemp" >
                    <div className="leftp">
                      <img className="leftimgp" src={dat.img} alt="" />
                    </div>
                    <div className="">
                      <div className="pointer">
                        {/* <h3 onClick={""}> */}
                        <h3 onClick={() => navigateToArticle(dat.postid)}>
                          {dat.title}
                        </h3>
                      </div>
                      <div className="description">
                        {dat.desc}
                      </div>
                      <div className="profile_data2">
                        <div className="red" onClick={() => deleteposts(dat.postid)}>Delete</div>
                      </div>
                    </div>
                  </div>
                </div>)
              })


              : <div className="ssm">Click above to show Your Posts</div>
          }













        </div>


        <div className="bookmark-main ">
          <h1 className="heading1 sm" onClick={()=>{handlefoll()}}>People You Follows:</h1>
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


            




          </ div>







        </div>

      </div>
      <Footer />
    </div>
  );
}

export default UserProfile;
