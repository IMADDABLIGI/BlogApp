import React from 'react';
import './About.css';
import aboutimg from '/aboutus.jpg'
import assma from '/assma.jpeg'
import pp from '/pp.PNG'
import imad from '/imad.jpg'
import koko from '/koko.jpg'
import han from '/han.jpg'
import HomeHead from '../home/HomeHead';

function About() {
  return (
    <div>
      <HomeHead />
      <section className="about-section">
        <div className="about-banner-wrapper">
          <img src={aboutimg} alt="Team working" className="about-banner" />
          <div className="about-title-overlay"></div>
        </div>

        <div className="about-content">
          <h2 className="styled-heading">Your Success is Our Inspiration</h2>
          <p className="styled-heading1">
            Our Story & Strength in the Market: Founded in 2020, our platform was born out of a vision to simplify
            the entrepreneurial journey for emerging founders. Over the years, we’ve grown into a trusted ecosystem
            that supports thousands of users through curated learning paths, startup tools, and expert mentorship.
            What sets us apart is our deep market insight, a strong community-driven approach, and our ability to
            adapt quickly to the evolving needs of entrepreneurs.
          </p>

          <div className="about-values">
            <h3>Our Values</h3>
            <ul>
              <li>✔️ Integrity and transparency</li>
              <li>✔️ Innovation and creativity</li>
              <li>✔️ Customer-centric solutions</li>
              <li>✔️ Continuous learning</li>
            </ul>
          </div>

          <div className="about-team">
            <h3>Meet the Team</h3>
            <div className="team-grid">
              <div className="team-member">
                <img src={koko} alt="soukaina" />
                <p>soukaina<br /><small>Developer</small></p>
              </div>
              <div className="team-member">
                <img src={assma} alt="Asmaa" />
                <p>Asmaa<br /><small>Designer</small></p>
              </div>
              <div className="team-member">
                <img src={imad} alt="Imad" />
                <p>Imad<br /><small>DevOps Engineer</small></p>
              </div>
              <div className="team-member">
                <img src={han} alt="Hannan" />
                <p>Hannan<br /><small>Product Manager</small></p>
              </div>
              <div className="team-member">
                <img src={pp} alt="Hamza" />
                <p>Hamza<br /><small>Marketing Lead</small></p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default About;