import { useState } from "react";
// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";
// import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/login-page";
import RegisterPage from "./pages/register-page";
import HomePage from "./pages/home-page";
import ProtectedRoutes from "./utils/ProtectedRoutes";
import DashboardPage from "./pages/dashboard-page";
import PointsPage from "./pages/points-page";
import SustentabilityPage from "./pages/sustainability-page";
import SupportPage from "./pages/support-page";
import RotasPage from "./pages/rotas-page";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route element={<ProtectedRoutes />}>
          <Route path="/home" element={<DashboardPage />} />
          <Route path="/points" element={<PointsPage />} />
          <Route path="/sustainability" element={<SustentabilityPage />} />
          <Route path="/support" element={<SupportPage />} />
          <Route path="/routes" element={<RotasPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
