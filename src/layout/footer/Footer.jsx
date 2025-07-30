import { NavLink } from "react-router-dom";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="footer-content">

        {/* Mapa del sitio */}
        <div className="footer-section">
          <h4>Mapa del Sitio</h4>
          <ul>
            <li><NavLink to="/home">Inicio</NavLink></li>
            <li><NavLink to="/enfermedades">Enfermedades</NavLink></li>
            <li><NavLink to="/quiz">Quiz Interactivo</NavLink></li>
            <li><NavLink to="/nosotros">Sobre Nosotros</NavLink></li>
            <li><NavLink to="/login">Iniciar/Cerrar Sesión</NavLink></li>
          </ul>
        </div>

        {/* Enlaces importantes */}
        <div className="footer-section">
          <h4>Enlaces Importantes</h4>
          <ul>
            <li><a href="https://www.who.int/es/news-room/fact-sheets/detail/blindness-and-visual-impairment" target="_blank" rel="noopener noreferrer">OMS: Salud Visual</a></li>
            <li><a href="https://www.spo.org.pe/" target="_blank" rel="noopener noreferrer">Sociedad Peruana de Oftalmología</a></li>
            <li><a href="https://www.aao.org/eye-health" target="_blank" rel="noopener noreferrer">American Academy of Ophthalmology</a></li>
          </ul>
        </div>

        {/* Copyright */}
        <div className="copyright">
          <p>© {new Date().getFullYear()} OrganCare3D. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
