import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom"; // Corregido a react-router-dom
import Home from "./pages/home/Home";
import Quiz from "./pages/quiz/Quiz";
import NotFound from "./pages/not-found/NotFound";
import Heart from "./pages/heart/Heart";
import HighBloodPressure from "./pages/heart/high-blood-pressure/HighBloodPressure";
import LowBloodPressure from "./pages/heart/low-blood-pressure/LowBloodPressure";
import "./index.css";
import Layout from "./layout/Layout";
import Login from "./pages/login/Login";
import Queratocono from "./pages/enfermedades/queratocono/Queratocono";
import Conjuntivitis from "./pages/enfermedades/conjuntivitis/Conjuntivitis";
import Glaucoma from "./pages/enfermedades/glaucoma/Glaucoma";
import Cataratas from "./pages/enfermedades/cataratas/Cataratas";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      {/* Ruta de login independiente */}
      <Route path="/login" element={<Login />} />
      
      {/* Rutas con Layout */}
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="enfermedades" element={<Home />}/>
        <Route path="nosotros" element={<Home />}/>
        <Route path="queratocono" element={<Queratocono />} />
        <Route path="conjuntivitis" element={<Conjuntivitis />} />
        <Route path="glaucoma" element={<Glaucoma />} />
        {/*<Route path="cataratas" element={<Cataratas />} />*/}
        <Route path="quiz" element={<Quiz />} />
        <Route path="corazon" element={<Heart />}>
          <Route path="presion-alta" element={<HighBloodPressure />} />
          <Route path="presion-baja" element={<LowBloodPressure />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  </BrowserRouter>
);