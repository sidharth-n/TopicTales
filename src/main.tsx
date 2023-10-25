import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

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
  /*   <React.StrictMode> */
  <App />
  /*  </React.StrictMode>, */
);
