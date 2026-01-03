import React from "react";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-grid">
        {/* Brand column */}
        <div className="footer-brand">
          <div className="logo">
            <div className="logo-icon">e</div>
            <span className="logo-text">Englexa<span className="dot">.</span></span>
          </div>

          <p className="tagline">
            Your English Personal Confidence <br />
            Tutor — Learn. Speak. Succeed.
          </p>

          <div className="socials">
            <span>◎</span>
            <span>✕</span>
            <span>◉</span>
            <span>◌</span>
          </div>
        </div>

        {/* Menu */}
        <div className="footer-col">
          <h4>Menu</h4>
          <ul>
            <li>Home</li>
            <li>My Services</li>
            <li>About</li>
            <li>Resources</li>
            <li>Blog</li>
            <li>Contact</li>
          </ul>
        </div>

        {/* Services */}
        <div className="footer-col">
          <h4>Services</h4>
          <ul>
            <li>Conversational English</li>
            <li>Business English</li>
            <li>IELTS or Exam Preparation</li>
            <li>Grammar and Writing</li>
            <li>Kids English Classes</li>
            <li>Specific English</li>
          </ul>
        </div>

        {/* Extra links */}
        <div className="footer-col">
          <h4>Extra Links</h4>
          <ul>
            <li>Links Page</li>
            <li>Pricing</li>
            <li>FAQs</li>
            <li>Privacy Policy</li>
            <li>Terms and Conditions</li>
            <li>404</li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <span>© 2025 Englexa. Tutor Framer Template</span>
        <span>Built in Framer | Created by Cherrnyshov</span>
      </div>
    </footer>
  );
}




  //css code for the footer:

  .footer {
    background-color: #1f2233;
    color: #e6e7ee;
    padding: 80px 100px 40px;
    font-family: Inter, system-ui, sans-serif;
    background-image:
      linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px);
    background-size: 60px 60px;
  }
  
  .footer-grid {
    display: grid;
    grid-template-columns: 2fr 1fr 1.5fr 1.5fr;
    gap: 80px;
    align-items: flex-start;
  }
  
  .footer-brand {
    max-width: 380px;
  }
  
  .logo {
    display: flex;
    align-items: center;
    gap: 12px;
    font-size: 28px;
    font-weight: 700;
  }
  
  .logo-icon {
    width: 40px;
    height: 40px;
    background: #ff6a4d;
    color: #fff;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 800;
  }
  
  .logo-text .dot {
    color: #ff6a4d;
  }
  
  .tagline {
    margin-top: 18px;
    line-height: 1.6;
    color: #cfd2e6;
    font-size: 15px;
  }
  
  .socials {
    display: flex;
    gap: 18px;
    margin-top: 24px;
    font-size: 20px;
    color: #ff6a4d;
  }
  
  .footer-col h4 {
    font-size: 18px;
    margin-bottom: 18px;
    font-weight: 600;
  }
  
  .footer-col ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  
  .footer-col li {
    margin-bottom: 14px;
    font-size: 15px;
    color: #cfd2e6;
  }
  
  .footer-bottom {
    margin-top: 70px;
    display: flex;
    justify-content: space-between;
    font-size: 14px;
    color: #a9adc9;
  }
  