import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { FirebaseProvider } from "./context/FirebaseProvider.tsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Register from "./Register.tsx";
import Login from "./Login.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <FirebaseProvider>
      <BrowserRouter>
        <Routes>
          <Route index path="/" element={<App />} />
          <Route path="/signup" element={<Register />} />
          <Route path="/signin" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </FirebaseProvider>
  </StrictMode>,
);
