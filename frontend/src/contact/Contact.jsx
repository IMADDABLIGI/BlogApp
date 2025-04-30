import React from "react";
import "./Contact.css";
import { Mail, Phone, MapPin } from "lucide-react";
import HomeHead from "../home/HomeHead";

const ContactUs = () => {
  return (
    <div>
      <HomeHead />
    <section className="contact-section">
      <div className="contact-container">
        {/* Colonne gauche : Infos de contact */}
        <div className="contact-left">
          <h2 className="contact-title">Get In Touch With Us Now !</h2>
          <div className="contact-item">
            <Phone className="icon" />
            <span>+212 689744534</span>
          </div>
          <div className="contact-item">
            <Mail className="icon" />
            <span>Innominds@gmail.com</span>
          </div>
          <div className="contact-item">
            <MapPin className="icon" />
            <span>518, TechnoPark Casa</span>
          </div>
        </div>

        {/* Colonne droite : Formulaire */}
        <div className="contact-right">
          <form className="contact-form">
            <div className="form-row">
              <input type="text" placeholder="First Name" required />
              <input type="text" placeholder="Last Name" required />
            </div>
            <div className="form-row">
              <input type="tel" placeholder="Mobile Phone" required />
              <input type="email" placeholder="Email Address" required />
            </div>
            <div className="form-row full-width">
              <textarea rows="5" placeholder="Your Message" required></textarea>
            </div>
            <div className="form-row full-width">
              <button type="submit">Submit</button>
            </div>
          </form>
        </div>
      </div>
    </section>
    </div>
  );
};

export default ContactUs;
