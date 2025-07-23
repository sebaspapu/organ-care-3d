import { React, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { NavLink } from "react-router";
import "./Home.css";
import eyeImage from "../../assets/eye.jpg";
// Importa las imágenes de los iconos de enfermedades
import oceye from "../../assets/oc-eye.gif";

// Icono para el quiz
import checkIcon from "../../assets/check-Icon.png";

import Eye from './models-3d/home/Eye';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import Light from './lights/home/Lights';

const Home = () => {
  const location = useLocation();

  // Dirige a la sección de enfermedades
  useEffect(() => {
    if (location.pathname === "/enfermedades") {
      const diseasesSection = document.getElementById("diseases-section");
      if (diseasesSection) {
        diseasesSection.scrollIntoView({ behavior: "smooth" });
      }
    }
    if (location.pathname === "/nosotros") {
      const diseasesSection = document.getElementById("about-us");
      if (diseasesSection) {
        diseasesSection.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location]);

  return (
    <div className="home-container">
      {/* Primera sección - Hero */}
      <div className="hero-section">
        {/* Modelo 3D a la izquierda */}
        <div className="model-container">
          <Canvas
            shadows
            camera={{ position: [2, 2, 5], fov: 50 }}
            style={{ background: '#FFFFFF', borderRadius: '20px' }}
          >
            <Light />
            <OrbitControls enableZoom={false} />
            <Eye />
          </Canvas>
        </div>

        {/* Texto a la derecha */}
        <div className="hero-text-content">
          <h1 className="hero-title">
            Explora el Ojo Humano
            
          </h1>
          <p className="hero-description">
            Entiende las Enfermedades del Ojo y Protege tu Visión
          </p>
          <button
            className="adventure-button"
            onClick={() => {
              document.getElementById("diseases-section")?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            ¡Comienza tu aventura aquí!
          </button>
        </div>
      </div>

      {/* Segunda sección - Enfermedades */}
      <div id="diseases-section" className="diseases-section">
        <div className="diseases-header">
          <h2 className="diseases-title">
            ANÍMATE A<br />
            APRENDER SOBRE ...
          </h2>
          <p className="diseases-subtitle">Las siguientes enfermedades</p>
        </div>

        <div className="diseases-cards">
          <div className="disease-card">
            <div className="disease-icon">
              <img src={oceye} alt="Enfermedad 1" />
            </div>
            <h3 className="disease-name">QUERATOCONO</h3>
            <NavLink className="guest-text" to="/queratocono" end>
              <button className="disease-button">¡Ir aquí!</button>
            </NavLink>
          </div>

          <div className="disease-card">
            <div className="disease-icon">
              <img src={oceye} alt="Enfermedad 2" />
              <div className="disease-icon-overlay">
                <div className="disease-icon-lightning"></div>
                <div className="disease-icon-lightning"></div>
                <div className="disease-icon-lightning"></div>
              </div>
            </div>
            <h3 className="disease-name">CONJUNTIVITIS</h3>
            <NavLink className="guest-text" to="/conjuntivitis" end>
              <button className="disease-button">¡Ir aquí!</button>
            </NavLink>
          </div>

          <div className="disease-card">
            <div className="disease-icon">
              <img src={oceye} alt="Enfermedad 3" />
              <div className="disease-icon-gear"></div>
            </div>
            <h3 className="disease-name">GLAUCOMA</h3>
            <NavLink className="guest-text" to="/glaucoma" end>
              <button className="disease-button">¡Ir aquí!</button>
            </NavLink>
          </div>

          {/*<div className="disease-card">
            <div className="disease-icon">
              <img src={oceye} alt="Enfermedad 4" />
              <div className="disease-icon-drops"></div>
            </div>
            <h3 className="disease-name">CATARATA</h3>
            <NavLink className="guest-text" to="/cataratas" end>
              <button className="disease-button">¡Ir aquí!</button>
            </NavLink>
          </div>
          */}
        </div>
      </div>

      {/* Tercera sección - Quiz Interactivo */}
      <div className="quiz-section">
        <div className="quiz-content">
          <h2 className="quiz-title">¿TE ATREVES A INTENTARLO?</h2>

          <div className="quiz-icon-container">
            <img src={checkIcon} alt="Quiz check" className="quiz-check-icon" />
          </div>

          <h3 className="quiz-subtitle">Quiz Interactivo</h3>

          <p className="quiz-description">
            Demuestra tu aprendizaje sobre las enfermedades y autocuidado de
            este órgano.
          </p>

          <Link to="/quiz" className="quiz-button">
            Intentar
          </Link>
        </div>
        <div className="quiz-background-shape"></div>
      </div>
      <section id="about-us" className="about-us">
        <div className="box-about-us">
        <h1 className="title-about-us">SOBRE NOSOTROS...</h1>
        <p className="description-about-us">
          OrganCare3D nace como una propuesta para enseñar e ilustrar a las
          personas de forma dinámica, pedagógica y creativa sobre las
          enfermedades que afectan a los distintos órganos del cuerpo humano;
          específicamente el ojo. Parte de esta iniciativa no sería posible sin
          el arduo trabajo de los integrantes del grupo que la componen:
        </p>

        <div className="cards-about-us">
          <div className="card-about-us">
            <h2>Erika García</h2>
            <p>Estudiante de la Universidad del Valle</p>
            <p className="email-about-us">
              erika.garcia.munoz@correounivalle.edu.co
            </p>
          </div>
          <div className="card-about-us">
            <h2>Juan Perea</h2>
            <p>Estudiante de la Universidad del Valle</p>
            <p className="email-about-us">
              juan.coronado@correounivalle.edu.co
            </p>
          </div>
          <div className="card-about-us">
            <h2>Sebastián Bolaños</h2>
            <p>Estudiante de la Universidad del Valle</p>
            <p className="email-about-us">
              sebastian.bolanos@correounivalle.edu.co
            </p>
          </div>
          {/* 
          <div className="card-about-us">
            <h2>Johan Riveros</h2>
            <p>Estudiante de la Universidad del Valle</p>
            <p className="email-about-us">
              johan.riveros@correounivalle.edu.co
            </p>
          </div>
          */}
        </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
