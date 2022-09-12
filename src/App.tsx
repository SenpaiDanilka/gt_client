import { Routes, Route } from "react-router-dom";
import SignIn from "./views/SignIn";
import SignUp from "./views/SignUp";
import Home from "./views/Home";
import MySpaces from "./views/MySpaces";


export default function App() {

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="sign_up" element={<SignUp />} />
        <Route path="sign_in" element={<SignIn />} />
        <Route path="my_spaces" element={<MySpaces />} />
      </Routes>
    </div>
  )
}