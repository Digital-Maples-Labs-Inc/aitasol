import React from "react";
import "./Hero.css";

export default function Hero() {
  return (
    <section className="hero">
      {/* NAV */}
      <header className="nav">
        <div className="nav-left">
          <div className="brand">
            <div className="brand-icon">e</div>
            <span className="brand-text">
              Englexa<span>.</span>
            </span>
          </div>
        </div>

        <nav className="nav-center">
          <a className="active">Home</a>
          <a>Services</a>
          <a>About</a>
          <a>Resources</a>
          <a>Blog</a>
        </nav>

        <div className="nav-right">
          <button className="cta-outline">Get in Touch</button>
        </div>
      </header>

      {/* HERO CONTENT */}
      <div className="hero-content">
        <div className="badge">✴ Online English Tutoring</div>

        <h1>
          The English Tutor <br />
          Who Builds Your Confidence
          <span className="avatar">
            <img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200" />
          </span>
        </h1>

        <p className="subtitle">
          Personalized online English tutoring designed for your goals.
        </p>

        <div className="actions">
          <button className="cta-primary">
            Book a Free Trial Lesson
          </button>
          <button className="cta-icon">↗</button>
        </div>

        <div className="social-proof">
          <div className="avatars">
            <img src="https://randomuser.me/api/portraits/women/44.jpg" />
            <img src="https://randomuser.me/api/portraits/men/32.jpg" />
            <img src="https://randomuser.me/api/portraits/women/68.jpg" />
            <img src="https://randomuser.me/api/portraits/men/75.jpg" />
          </div>

          <div className="rating">
            ★★★★★ <span>4.8/5</span>
            <div>500+ Satisfied Students</div>
          </div>
        </div>
      </div>

      {/* VIDEO CARD */}
      <div className="video-card">
        <div className="speech-bubble">
          Hello, there! <br /> I'm Jessica, your personal english tutor!
        </div>

        <div className="video-overlay">
          <div className="play">▶</div>
        </div>
      </div>

      {/* PARTNERS */}
      <div className="partners">
        <span>Partners with</span>
        <div className="logos">
          <span>logoipsum</span>
          <span>logoipsum</span>
          <span>logoipsum</span>
          <span>logoipsum</span>
          <span>logoipsum</span>
        </div>
      </div>
    </section>
  );
}


// css code for the hero section:

.hero {
    min-height: 100vh;
    padding: 28px 64px 80px;
    color: #fff;
    font-family: Inter, system-ui, sans-serif;
    background-color: #25283b;
    background-image:
      linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px);
    background-size: 56px 56px;
    position: relative;
  }
  
  /* NAV */
  .nav {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: #323552;
    border-radius: 16px;
    padding: 14px 24px;
  }
  
  .brand {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  
  .brand-icon {
    width: 34px;
    height: 34px;
    background: #ff7a59;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 800;
  }
  
  .brand-text {
    font-size: 20px;
    font-weight: 700;
  }
  
  .brand-text span {
    color: #ff7a59;
  }
  
  .nav-center a {
    margin: 0 16px;
    opacity: 0.75;
    font-size: 14px;
  }
  
  .nav-center .active {
    opacity: 1;
  }
  
  .cta-outline {
    background: #d77a55;
    color: white;
    border: none;
    padding: 10px 18px;
    border-radius: 999px;
  }
  
  /* HERO TEXT */
  .hero-content {
    text-align: center;
    max-width: 820px;
    margin: 90px auto 0;
  }
  
  .badge {
    display: inline-block;
    padding: 8px 14px;
    border-radius: 999px;
    background: #323552;
    font-size: 13px;
    margin-bottom: 24px;
  }
  
  h1 {
    font-size: 56px;
    line-height: 1.15;
    font-weight: 700;
    margin-bottom: 20px;
    position: relative;
  }
  
  .avatar {
    display: inline-block;
    margin-left: 14px;
    transform: translateY(10px);
  }
  
  .avatar img {
    width: 52px;
    height: 52px;
    border-radius: 14px;
  }
  
  .subtitle {
    opacity: 0.75;
    margin-bottom: 28px;
  }
  
  .actions {
    display: flex;
    justify-content: center;
    gap: 12px;
    margin-bottom: 36px;
  }
  
  .cta-primary {
    background: #d77a55;
    color: white;
    padding: 14px 22px;
    border-radius: 999px;
    border: none;
    font-weight: 600;
  }
  
  .cta-icon {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    border: none;
    background: #d77a55;
    color: white;
  }
  
  /* SOCIAL PROOF */
  .social-proof {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 24px;
  }
  
  .avatars img {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    border: 2px solid #25283b;
    margin-left: -10px;
  }
  
  .rating {
    font-size: 14px;
    opacity: 0.9;
  }
  
  /* VIDEO CARD */
  .video-card {
    margin: 70px auto 0;
    width: 900px;
    height: 420px;
    border-radius: 24px;
    background: url("https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200")
      center/cover;
    position: relative;
  }
  
  .video-overlay {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .play {
    width: 72px;
    height: 72px;
    border-radius: 50%;
    background: rgba(255,255,255,0.9);
    color: #25283b;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 24px;
  }
  
  /* SPEECH */
  .speech-bubble {
    position: absolute;
    top: 20px;
    left: 20px;
    background: white;
    color: #25283b;
    padding: 14px;
    border-radius: 12px;
    font-size: 13px;
    max-width: 220px;
  }
  
  /* PARTNERS */
  .partners {
    margin-top: 70px;
    text-align: center;
    opacity: 0.7;
  }
  
  .logos {
    display: flex;
    justify-content: center;
    gap: 48px;
    margin-top: 14px;
  }
  