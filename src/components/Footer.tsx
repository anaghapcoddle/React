import React from 'react';
import { SocialIcon } from 'react-social-icons';
import './Footer.css';

function Footer() {
  return (
    <footer>
      <div>
        <SocialIcon
          className="social-media-icon"
          url="https://facebook.com"
          bgColor="rgba(192, 161, 89, 255)"
          fgColor="rgba(0, 67, 50, 255)"
        />
        <SocialIcon
          className="social-media-icon"
          url="https://twitter.com"
          bgColor="rgba(192, 161, 89, 255)"
          fgColor="rgba(0, 67, 50, 255)"
        />
        <SocialIcon
          className="social-media-icon"
          url="https://linkedin.com"
          bgColor="rgba(192, 161, 89, 255)"
          fgColor="rgba(0, 67, 50, 255)"
        />
      </div>
      <div>
        <p>Shop No 6, Anil Sharma Chawl · Santacruz, Mumbai · India</p>
      </div>
      <div className="footer-contact-details">
        <div>&#9742; +91 9998877766 </div>
        <div>&#9993; brunchclub@gmail.com</div>
      </div>
      <div>
        <p>Copyright © 2023 Anagha. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
