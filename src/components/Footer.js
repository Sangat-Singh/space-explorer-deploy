import React from 'react';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-content">
        <h3>🚀 Stellar.log</h3>
        <p>Thank you for exploring the universe with us.</p>

        <div className="social-icons">
          <a href="https://www.instagram.com/sangat_s24?utm_source=qr&igsh=ZDJjejB6andkdWhj" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-instagram"></i>
          </a>
          <a href="https://github.com/Sangat-Singh" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-github"></i>
          </a>
          <a href="https://www.linkedin.com/in/sangat-singh-811637271?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-linkedin"></i>
          </a>
        </div>

        <p className="copyright">
          © {new Date().getFullYear()} Stellar.log. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
