import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import LandingPage from "./components/LandingPage.tsx";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


// Register Service Worker
if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("/service-worker.js")
    .then((registration) => {
      console.debug("Service Worker registered:", registration);
    })
    .catch((registrationError) => {
      console.debug("Service Worker registration failed:", registrationError);
    });
}

ReactDOM.createRoot(document.getElementById("root")!).render(
<Router>
<Routes>
    <Route path="/" element={<LandingPage />} />
    <Route path="/app" element={<App />} />

</Routes>
</Router>

);
