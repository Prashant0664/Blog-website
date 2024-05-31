import React from "react";
import "./card.css";
import { Parallax } from 'react-parallax';
import { useMediaQuery } from "react-responsive";
function Card() {
  const view1 = useMediaQuery({ query: "(max-width: 564px)" });
  const view2 = useMediaQuery({ query: "(max-width: 420px)" });
  return (
    <div className="intro_section">
      <Parallax className="parallex-img" bgClassName={"bgimg"} bgImage="/best.jpg" bgImageAlt="the cat" blur={4} strength={900}>
        <h3 className="card-text">
          {view1 ? "Whether you're a seasoned blogger or just starting out, our website is the ultimate platform to showcase your projects through engaging blogs. With our user-friendly blog app, we provide the perfect solution to help you achieve your blogging goals. From sharing your creative endeavors to documenting your professional projects, our platform offers a seamless experience."
            : "Whether you're a seasoned blogger or just starting out, our website is the ultimate platform to showcase your projects through engaging blogs. With our user-friendly blog app, we provide the perfect solution to help you achieve your blogging goals. From sharing your creative endeavors to documenting your professional projects, our platform offers a seamless experience. Join our vibrant community of bloggers, tap into our diverse audience, and watch your ideas come to life. Don't wait any longer! Start creating your own blog today and let your projects shine on our dynamic platform."}
        </h3>
      </Parallax>
    </div>
  );
}

export default Card;
