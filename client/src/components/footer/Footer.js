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
              <a href="https://github.com/codinghs" className="subfot">Pricing</a>
            </li>
            <li>
              <a href="https://github.com/codinghs" className="subfot">Customer</a>
            </li>
            <li>
              <a href="https://github.com/codinghs" className="subfot">Docs</a>
            </li>
            <li>
              <a href="https://github.com/codinghs" className="subfot">Blog</a>
            </li>
            <li>
              <a href="mailto:harshitmv05@gmail.com" className="subfot">Request a Demo</a>
            </li>
          </ul>
        </div>
        <div className="footer-column">
          <h3>About Us</h3>
          <ul>
            <li>
              <a href="https://github.com/codinghs" className="subfot">Our Story</a>
            </li>
            <li>
              <a href="https://github.com/codinghs" className="subfot">Our Team</a>
            </li>
            <li>
              <a href="https://github.com/codinghs" className="subfot">Our Mission</a>
            </li>
            <li>
              <a href="https://github.com/codinghs" className="subfot">Our Vision</a>
            </li>
            <li>
              <a href="mailto:harshitmv05@gmail.com" className="subfot">Contact Us</a>
            </li>
          </ul>
        </div>
        <div className="footer-column">
          <h3>Resources</h3>
          <ul>
            <li>
              <a href="https://github.com/codinghs" className="subfot">Blog</a>
            </li>
            <li>
              <a href="https://github.com/codinghs" className="subfot">Whitepapers</a>
            </li>
            <li>
              <a href="https://github.com/codinghs" className="subfot">Webinars</a>
            </li>
            <li>
              <a href="https://github.com/codinghs" className="subfot">Case Studies</a>
            </li>
            <li>
              <a href="https://github.com/codinghs" className="subfot">FAQs</a>
            </li>
          </ul>
        </div>
        <div className="footer-column">
          <h3>Connect With Us</h3>
          <ul>
            <li>
              <a href="https://github.com/codinghs" className="subfot">Instagram</a>
            </li>
            <li>
              <a href="https://github.com/codinghs" className="subfot">LinkedIn</a>
            </li>
            <li>
              <a href="https://github.com/codinghs" className="subfot">YouTube</a>
            </li>
          </ul>
        </div>
      </div>
      <div className="footer-info">
        <p>
          &copy; 2021-2025 @ Made By <a href="https://github.com/codinghs" target="_blank">Harshit</a>
        </p>
        <p>
          For any issue kindly send mail to <a type="mail" href="mailto:harshitmv05@gmail.com"> harshitmv05@gmail.com </a>
        </p>
      </div>
    </footer>
  );
}

export default Footer;
