import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { FirebaseProvider } from "./context/FirebaseProvider.tsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Register from "./Register.tsx";
import Login from "./Login.tsx";
import ReactionTime from "./components/ReactionTime.tsx";
import Rules from "./Rules.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <FirebaseProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<App />}>
            <Route path="/" element={<ReactionTime />} />
            <Route path="/rules" element={<Rules />} />
            <Route path="/signup" element={<Register />} />
            <Route path="/signin" element={<Login />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </FirebaseProvider>
  </StrictMode>,
);
