import React from "react";
import "./card.css";
import { Parallax } from 'react-parallax';
import { useMediaQuery } from "react-responsive";
import { useNavigate } from "react-router-dom";

function Card({ setmpost, setflag, flag, mpost }) {
  const view1 = useMediaQuery({ query: "(max-width: 564px)" });
  const navigate = useNavigate();
  const arr = ["tech", "lifestyle", "food", "travelling"];

  return (
    <div className="intro_section">
      <Parallax className="parallax-img" bgClassName="bgimg" bgImage="/best.jpg" bgImageAlt="Blog Image" blur={4} strength={500}>
        <div className="dropdown">
          <button className="dropbtn">
            <div>{mpost[0].toUpperCase() + mpost.substr(1)}</div>
            <svg fill="white" width="16px" height="16px" viewBox="-6.5 0 32 32" xmlns="http://www.w3.org/2000/svg">
              <path d="M18.813 11.406l-7.906 9.906c-0.75 0.906-1.906 0.906-2.625 0l-7.906-9.906c-0.75-0.938-0.375-1.656 0.781-1.656h16.875c1.188 0 1.531 0.719 0.781 1.656z"></path>
            </svg>
          </button>
          <div className="dropdown-content">
            {mpost !== "all" && (
              <div className="di" onClick={() => {
                setmpost("all"); setflag(false); navigate("/"); window.location.reload();
              }}>
                All
              </div>
            )}
            {arr.map((item, index) => (
              <div key={index} className="di" onClick={() => {
                setmpost(item); setflag(true); navigate(`/topic/${item}`); window.location.reload();
              }}>
                {item.toUpperCase()}
              </div>
            ))}
          </div>
        </div>

        <h3 className="card-text">
          {view1
            ? "Whether you're a seasoned blogger or just starting out, our website is the ultimate platform to showcase your projects through engaging blogs."
            : "Whether you're a seasoned blogger or just starting out, our website is the ultimate platform to showcase your projects through engaging blogs. From sharing creative endeavors to professional projects, our platform offers a seamless experience. Join our community and bring your ideas to life."}
        </h3>
      </Parallax>
    </div>
  );
}

export default Card;
