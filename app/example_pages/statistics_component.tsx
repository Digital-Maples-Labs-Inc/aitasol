import React from "react";
import "./ResultsSection.css";

export default function ResultsSection() {
  return (
    <section className="results">
      {/* Header */}
      <div className="results-header">
        <span className="results-badge">✴ Results</span>
        <h2>
          Helping Every Learner <br />
          Achieve Their Goals
        </h2>
        <p>
          Real progress, real outcomes — because your growth matters.
        </p>
      </div>

      {/* Grid */}
      <div className="results-grid">
        {/* Left image card */}
        <div className="card image-card">
          <img
            src="https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=800"
            alt=""
          />
          <div className="overlay-text">
            <h3>0+</h3>
            <span>Years of professional English teaching.</span>
          </div>
        </div>

        {/* Stat cards */}
        <div className="card stat-card">
          <div className="stat-icon">📝</div>
          <h3>0.0+</h3>
          <p>Students average grade on speaking IELTS/TOEFL.</p>
        </div>

        <div className="card stat-card">
          <div className="stat-icon">💬</div>
          <h3>0.0/5</h3>
          <p>Rating based on Google Reviews from my students.</p>
        </div>

        <div className="card stat-card">
          <div className="stat-icon">📈</div>
          <h3>0%</h3>
          <p>Learners report feeling more fluent after 10 lessons.</p>
          <div className="dashed-line" />
        </div>

        <div className="card stat-card">
          <div className="stat-icon">🎓</div>
          <h3>OK+</h3>
          <p>
            Professional, interactive, and tailored to every student lessons
            delivered.
          </p>
        </div>

        {/* World map */}
        <div className="card image-card">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/8/80/World_map_-_low_resolution.svg"
            alt=""
          />
          <div className="overlay-bottom">
            <h3>0+</h3>
            <span>
              Learners worldwide trust my lessons to build English confidence.
            </span>

            <div className="avatars">
              <img src="https://randomuser.me/api/portraits/men/32.jpg" />
              <img src="https://randomuser.me/api/portraits/women/44.jpg" />
              <img src="https://randomuser.me/api/portraits/men/56.jpg" />
              <img src="https://randomuser.me/api/portraits/men/75.jpg" />
            </div>
          </div>
        </div>

        {/* Students image */}
        <div className="card image-card">
          <img
            src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800"
            alt=""
          />
          <div className="overlay-text bottom-right">
            <h3>0%</h3>
            <span>Students continue after their first lesson.</span>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="results-cta">
        <button>
          Join My Next Lesson <span>↗</span>
        </button>
      </div>
    </section>
  );
}


//css code for the statistics component:

.results {
    padding: 120px 80px;
    background-color: #26293c;
    background-image:
      linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px);
    background-size: 56px 56px;
    color: #fff;
    font-family: Inter, system-ui, sans-serif;
  }
  
  .results-header {
    text-align: center;
    max-width: 720px;
    margin: 0 auto 70px;
  }
  
  .results-badge {
    display: inline-block;
    background: #343856;
    padding: 8px 14px;
    border-radius: 999px;
    font-size: 13px;
    margin-bottom: 18px;
  }
  
  .results-header h2 {
    font-size: 42px;
    line-height: 1.25;
    margin-bottom: 14px;
  }
  
  .results-header p {
    opacity: 0.75;
  }
  
  .results-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-auto-rows: 220px;
    gap: 24px;
  }
  
  /* Cards */
  .card {
    background: #2f334d;
    border-radius: 20px;
    padding: 22px;
    position: relative;
    overflow: hidden;
  }
  
  .image-card {
    padding: 0;
  }
  
  .image-card img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  /* Overlay text */
  .overlay-text {
    position: absolute;
    left: 22px;
    bottom: 22px;
  }
  
  .overlay-text.bottom-right {
    left: auto;
    right: 22px;
  }
  
  .overlay-text h3 {
    font-size: 36px;
    margin-bottom: 6px;
  }
  
  .overlay-text span {
    font-size: 14px;
    opacity: 0.85;
  }
  
  /* Bottom overlay */
  .overlay-bottom {
    position: absolute;
    left: 22px;
    bottom: 22px;
    right: 22px;
  }
  
  .overlay-bottom h3 {
    font-size: 32px;
  }
  
  .overlay-bottom span {
    font-size: 14px;
    opacity: 0.85;
  }
  
  .avatars {
    display: flex;
    margin-top: 12px;
  }
  
  .avatars img {
    width: 34px;
    height: 34px;
    border-radius: 50%;
    border: 2px solid #2f334d;
    margin-left: -10px;
  }
  
  /* Stat cards */
  .stat-card h3 {
    font-size: 40px;
    margin-bottom: 10px;
  }
  
  .stat-card p {
    font-size: 14px;
    opacity: 0.8;
    line-height: 1.5;
  }
  
  .stat-icon {
    position: absolute;
    top: 18px;
    right: 18px;
    font-size: 20px;
    opacity: 0.8;
  }
  
  .dashed-line {
    margin-top: 14px;
    width: 60px;
    border-bottom: 2px dashed #6a6f96;
  }
  
  /* CTA */
  .results-cta {
    margin-top: 80px;
    display: flex;
    justify-content: center;
  }
  
  .results-cta button {
    background: #d77a55;
    border: none;
    color: #fff;
    padding: 14px 26px;
    border-radius: 999px;
    font-size: 15px;
    font-weight: 600;
    display: flex;
    align-items: center;
    gap: 10px;
  }
  