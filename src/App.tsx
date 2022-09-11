import {Route, Routes} from "react-router-dom";
import SignUp from "./views/SignUp";
import SignIn from "./views/SignIn";
import Home from "./views/Home";
import LanguageSelect from "./components/LanguageSelect";
import React from "react";

export default function App() {
  return (
    <div className="">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="sign_up" element={<SignUp />} />
        <Route path="sign_in" element={<SignIn />} />
      </Routes>
      <LanguageSelect/>
    </div>
  );
}