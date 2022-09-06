import { Routes, Route } from "react-router-dom";
import SignIn from "./views/SignIn";
import Home from "./views/Home";

export default function App() {

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="sign_in" element={<SignIn />} />
      </Routes>
    </div>
  )
}