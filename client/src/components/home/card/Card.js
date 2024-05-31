import React from "react";
import "./card.css";
import { Parallax } from 'react-parallax';
import { useMediaQuery } from "react-responsive";
import { useNavigate } from "react-router-dom";
function Card({ setmpost, setflag ,flag, mpost}) {
  const view1 = useMediaQuery({ query: "(max-width: 564px)" });
  const navigate = useNavigate();
  const view2 = useMediaQuery({ query: "(max-width: 420px)" });
  var arr = ["tech", "lifestyle", "food", "travelling"];
  return (
    <div className="intro_section">
      <Parallax className="parallex-img" bgClassName={"bgimg"} bgImage="/best.jpg" bgImageAlt="the cat" blur={4} strength={900}>
        <div className="dropdown">
          <button class="dropbtn"><div>
            {mpost[0].toUpperCase() + mpost.substr(1,mpost.length)}
          </div>
            <svg fill="white" width="16px" height="16px" viewBox="-6.5 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>dropdown</title> <path d="M18.813 11.406l-7.906 9.906c-0.75 0.906-1.906 0.906-2.625 0l-7.906-9.906c-0.75-0.938-0.375-1.656 0.781-1.656h16.875c1.188 0 1.531 0.719 0.781 1.656z"></path> </g></svg></button>
          <div class="dropdown-content">
            <div className="dropdown-content" >
              {mpost!="all" && <div className="di" onClick={() => {
              setmpost("all"); setflag(false); navigate("/"); window.location.reload();
            }}>
              All
            </div>}
              {arr.map((i) => (
                <div className="di" onClick={() => {
                  setmpost(i); setflag(true); navigate(`/topic/${i}`); window.location.reload();
                }} >
                  {i.toUpperCase()}
                </div>
              ))}
            </div>

          </div>
        </div>
        <h3 className="card-text">
          {view1 ? "Whether you're a seasoned blogger or just starting out, our website is the ultimate platform to showcase your projects through engaging blogs. With our user-friendly blog app, we provide the perfect solution to help you achieve your blogging goals. From sharing your creative endeavors to documenting your professional projects, our platform offers a seamless experience."
            : "Whether you're a seasoned blogger or just starting out, our website is the ultimate platform to showcase your projects through engaging blogs. With our user-friendly blog app, we provide the perfect solution to help you achieve your blogging goals. From sharing your creative endeavors to documenting your professional projects, our platform offers a seamless experience. Join our vibrant community of bloggers, tap into our diverse audience, and watch your ideas come to life. Don't wait any longer! Start creating your own blog today and let your projects shine on our dynamic platform."}
        </h3>
      </Parallax>
    </div>
  );
}

export default Card;
