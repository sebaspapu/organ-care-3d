// Login.jsx
import { useNavigate } from 'react-router-dom';
import { signInWithPopup, auth, provider } from '../../firebase/firebase';
import google_logo from '../../assets/google-logo.png';
import './Login.css';
import OrganCare3D_Transparente from '../../assets/OrganCare3D_Transparente.png'
import { NavLink } from "react-router";

const Login = () => {
    const navigate = useNavigate();

    const handleGoogleLogin = async () => {
        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;
            console.log("Usuario autenticado:", user);
            // Aquí puedes guardar el usuario en contexto o global state
            navigate('/home'); // Cambia esto por la ruta a la que quieres llevar al usuario
        } catch (error) {
            console.error("Error al iniciar sesión con Google:", error);
        }
    };

    return (
        <div className="login-container">
            <div className="icon icon1"></div>
            <div className="icon icon2"></div>
            <div className="icon icon3"></div>
            <div className="icon icon4"></div>
            <div className="icon icon5"></div>
            <div className="icon icon6"></div>
            <div className="icon icon7"></div>
            <div className="icon icon8"></div>
            <div className="icon icon9"></div>
            <div className="login-circle">
                <div className="logo-container-login">
                    <img src={OrganCare3D_Transparente} className="logo-login" alt="OrganCare3D" />
                </div>
                <div className="auth-container">
                    <button className="google-button" onClick={handleGoogleLogin}>
                        <img src={google_logo} className="google-icon" alt="Google" />
                        Iniciar sesión con Google
                    </button>
                    <p className="register-text">
                        ¿No tienes una cuenta? <a href="/register">Regístrate aquí.</a>
                    </p>
                    <p>
                        <NavLink className="guest-text" to="/" end>
                            O continúa como invitado.
                        </NavLink>
                    </p>
                </div>
            </div>
            <div className="background-icons"></div>
        </div>
    );
};

export default Login;
