import React from 'react';
import './Footer.css';
import InstagramIcon from '@mui/icons-material/Instagram';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import GitHubIcon from '@mui/icons-material/GitHub';
import FacebookIcon from '@mui/icons-material/Facebook';
const Footer = () => {
  return (
    <footer className="modern-footer">
      <div className="footer-container">
        {/* Sección Información */}
        <div className="footer-block">
          <h3 className="footer-brand">LICORERIA Y MARKET ZUNCE 🍻</h3>
          <div className="footer-info">
            <p>Florencia,Caquetà Colombia</p>
            <p>Barrio Porvenir Florencia caquetá</p>
            <p>Transversal 6 #14A 26</p>
            <p className="highlight-text">Horario de atención: 8:00 AM - 5:00 PM</p>
            <p className="postal-code">Código Postal: 180001</p>
          </div>
        </div>

        {/* Sección Redes Sociales con iconos */}
        <div className="footer-block">
          <h4 className="footer-heading">Conéctate con nosotros</h4>
          <div className="social-container">
            <a href='https://wa.me/message/KHQFB32KWPMZH1' className="social-icon" aria-label="WhatsApp">
              <WhatsAppIcon />
            </a>
            <a href="https://www.instagram.com/licoreria_zunce?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" className="social-icon" aria-label="Instagram">
              <InstagramIcon />
            </a>
            <a href="https://www.facebook.com/people/Zunce-Market-Licoreria/100091523751533/" className="social-icon" aria-label="Facebook">
              <FacebookIcon />
            </a>
            <a href="https://github.com/KevinMoreno-pixel" className="social-icon" aria-label="GitHub">
              <GitHubIcon />
            </a>
          </div>
        </div>

        {/* Sección Contacto */}
        <div className="footer-block">
          <h4 className="footer-heading">Canales de atención</h4>
          <div className="contact-info">
            <div className="contact-item">
              <span className="contact-label">Teléfono:</span>
              <a href="tel:+570015622669" className="contact-link">(+57) 322 822 75 85</a>
            </div>
            <div className="contact-item">
              <span className="contact-label">Línea gratuita:</span>
              <a href="tel:018000112000" className="contact-link">------------------</a>
            </div>
            <div className="contact-item">
              <span className="contact-label">Correo:</span>
              <a href="mailto:contacto@riesgo.gov.co" className="contact-link">Edwarrios089@gmail.com</a>
            </div>
          </div>
        </div>
      </div>

      {/* Sección Legal */}
      <div className="footer-legal">
        <div className="legal-links">
          <a href="/politica-privacidad" className="legal-link">Política de privacidad</a>
          <span className="divider">|</span>
          <a href="/mapa-sitio" className="legal-link">Mapa del sitio</a>
          <span className="divider">|</span>
          <a href="/terminos" className="legal-link">Términos de uso</a>
        </div>
        <p className="copyright">&copy; {new Date().getFullYear()} UNGRD. Todos los derechos reservados</p>
      </div>
    </footer>
  );
};

export default Footer;