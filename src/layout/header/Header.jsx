import { NavLink, useNavigate } from "react-router-dom";
import "./Header.css";
import OrganCare3D_Transparente from "../../assets/OrganCare3D_Transparente.png";
import { FaHome, FaHeartbeat, FaQuestionCircle, FaInfoCircle, FaSignInAlt } from "react-icons/fa";
import { useAuth } from "../../context/AuthContext"; // contexto de auth
import { signOut } from "firebase/auth";
import { auth } from "../../firebase/firebase";

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log("Sesión cerrada");
      navigate("/login");
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  return (
    <header className="header-container">
      <div className="nav-section left-nav">
        <NavLink to="/" className="nav-item">
          <FaHome className="nav-icon" />
          <span>Inicio</span>
        </NavLink>
        <NavLink to="/enfermedades" className="nav-item">
          <FaHeartbeat className="nav-icon" />
          <span>Enfermedades</span>
        </NavLink>
        <NavLink to="/quiz" className="nav-item">
          <FaQuestionCircle className="nav-icon" />
          <span>Quiz Interactivo</span>
        </NavLink>
      </div>

      <div className="logo-section">
        <div className="logo-container">
          <NavLink to="/">
            <img src={OrganCare3D_Transparente} className="logo" alt="OrganCare3D" />
          </NavLink>
        </div>
      </div>

      <div className="nav-section right-nav">
        <NavLink to="/nosotros" className="nav-item">
          <FaInfoCircle className="nav-icon" />
          <span>Sobre Nosotros</span>
        </NavLink>


         <NavLink to="/login" className="nav-item"  onClick={handleLogout}>
            <FaSignInAlt className="nav-icon" />
            <span>Iniciar Sesión / Cerrar Sesión</span>
          </NavLink>
      </div>
    </header>
  );
};

export default Header;
