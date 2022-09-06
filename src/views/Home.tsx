import { Link } from "react-router-dom";

export default function SignIn() {
  return (
    <div>
      <h1>Home</h1>
      <Link to="/sign_up">SignUp</Link>
      <Link to="/sign_in">SignIn</Link>
    </div>
  )
}