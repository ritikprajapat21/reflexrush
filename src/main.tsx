import { lazy, StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { FirebaseProvider } from "./context/FirebaseProvider.tsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const App = lazy(() => import("./App"));
const Register = lazy(() => import("./Register"));
const ReactionTime = lazy(() => import("./components/ReactionTime"));
const Rules = lazy(() => import("./Rules"));
const Login = lazy(() => import("./Login"));

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
