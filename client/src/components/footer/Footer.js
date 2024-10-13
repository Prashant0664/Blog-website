import React from "react";
import "./footer.css";

function Footer() {
  return (
    <footer className="desktop-footer">
      <div className="footer-container">
        <div className="footer-column">
          <h3>Products</h3>
          <ul>
            <li>
              <a href="https://github.com/Prashant0664" className="subfot">Pricing</a>
            </li>
            <li>
              <a href="https://github.com/Prashant0664" className="subfot">Customer</a>
            </li>
            <li>
              <a href="https://github.com/Prashant0664" className="subfot">Docs</a>
            </li>
            <li>
              <a href="https://github.com/Prashant0664" className="subfot">Blog</a>
            </li>
            <li>
              <a href="https://mail-senderprojectv1.vercel.app" className="subfot">Request a Demo</a>
            </li>
          </ul>
        </div>
        <div className="footer-column">
          <h3>About Us</h3>
          <ul>
            <li>
              <a href="https://portfolio-prashant-xi.vercel.app/" className="subfot">Our Story</a>
            </li>
            <li>
              <a href="https://portfolio-prashant-xi.vercel.app/" className="subfot">Our Team</a>
            </li>
            <li>
              <a href="https://portfolio-prashant-xi.vercel.app/" className="subfot">Our Mission</a>
            </li>
            <li>
              <a href="https://portfolio-prashant-xi.vercel.app/" className="subfot">Our Vision</a>
            </li>
            <li>
              <a href="https://mail-senderprojectv1.vercel.app" className="subfot">Contact Us</a>
            </li>
          </ul>
        </div>
        <div className="footer-column">
          <h3>Resources</h3>
          <ul>
            <li>
              <a href="https://github.com/Prashant0664" className="subfot">Blog</a>
            </li>
            <li>
              <a href="https://github.com/Prashant0664" className="subfot">Whitepapers</a>
            </li>
            <li>
              <a href="https://github.com/Prashant0664" className="subfot">Webinars</a>
            </li>
            <li>
              <a href="https://github.com/Prashant0664" className="subfot">Case Studies</a>
            </li>
            <li>
              <a href="https://github.com/Prashant0664" className="subfot">FAQs</a>
            </li>
          </ul>
        </div>
        <div className="footer-column">
          <h3>Connect With Us</h3>
          <ul>
            <li>
              <a href="https://github.com/Prashant0664" className="subfot">Instagram</a>
            </li>
            <li>
              <a href="https://github.com/Prashant0664" className="subfot">LinkedIn</a>
            </li>
            <li>
              <a href="https://github.com/Prashant0664" className="subfot">YouTube</a>
            </li>
          </ul>
        </div>
      </div>
      <div className="footer-info">
        <p>
          &copy; 2021-2025 @ Made By <a href="https://github.com/Prashant0664" target="_blank">Prashant</a>
        </p>
        <p>
          For any issue kindly send mail to <a type="mail" href="mailto:prashant201103@gmail.com"> prashant201103@gmail.com </a>
        </p>
      </div>
    </footer>
  );
}

export default Footer;
