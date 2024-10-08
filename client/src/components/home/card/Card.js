import React, { useState } from "react";
import "./card.css";
import { Parallax } from "react-parallax";
import { useMediaQuery } from "react-responsive";
import { useNavigate } from "react-router-dom";
function Card({ setmpost, setflag, flag, mpost }) {
  const [isOpen, setIsOpen] = useState(false);
  const view1 = useMediaQuery({ query: "(max-width: 564px)" });
  const navigate = useNavigate();
  var arr = ["tech", "lifestyle", "food", "travelling"];

  const handleToggle = () => {
    setIsOpen(!isOpen);
    console.log("Toggle called");
    console.log(isOpen);
  };

  const handleSelect = (topic) => {
    setmpost(topic);
    setflag(topic !== "all");
    navigate(topic === "all" ? "/" : `/topic/${topic}`);
    setIsOpen(false); // Close dropdown after selection
  };

  return (
    <div className="intro_section">
      <Parallax
        className="parallex-img"
        bgClassName={"bgimg"}
        bgImage="/best.jpg"
        bgImageAlt="the cat"
        blur={4}
        strength={900}
      >
        <div className="dropdown-container">
          <button className="dropdown-btn" onClick={handleToggle}>
            <div className="dropdown-label">
              {mpost.charAt(0).toUpperCase() + mpost.slice(1)}
            </div>
            <svg
              fill="#000"
              width="16px"
              height="16px"
              viewBox="-6.5 0 32 32"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M18.813 11.406l-7.906 9.906c-0.75 0.906-1.906 0.906-2.625 0l-7.906-9.906c-0.75-0.938-0.375-1.656 0.781-1.656h16.875c1.188 0 1.531 0.719 0.781 1.656z"></path>
            </svg>
          </button>

          {isOpen && (
            <div className="dropdown-content">
              {mpost !== "all" && (
                <div
                  className="dropdown-item"
                  onClick={() => handleSelect("all")}
                >
                  All
                </div>
              )}
              {arr.map((item, index) => {
                console.log(item, " ", index);
                return (
                  <div
                    key={index}
                    className="dropdown-item"
                    onClick={() => handleSelect(item)}
                  >
                    {item.toUpperCase()}
                  </div>
                );
              })}
            </div>
          )}
        </div>
        <h3 className="card-text">
          {view1
            ? "Whether you're a seasoned blogger or just starting out, our website is the ultimate platform to showcase your projects through engaging blogs. With our user-friendly blog app, we provide the perfect solution to help you achieve your blogging goals. From sharing your creative endeavors to documenting your professional projects, our platform offers a seamless experience."
            : "Whether you're a seasoned blogger or just starting out, our website is the ultimate platform to showcase your projects through engaging blogs. With our user-friendly blog app, we provide the perfect solution to help you achieve your blogging goals. From sharing your creative endeavors to documenting your professional projects, our platform offers a seamless experience. Join our vibrant community of bloggers, tap into our diverse audience, and watch your ideas come to life. Don't wait any longer! Start creating your own blog today and let your projects shine on our dynamic platform."}
        </h3>
      </Parallax>
    </div>
  );
}

export default Card;
