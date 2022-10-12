import Cookie from 'js-cookie'
import {gql} from "@apollo/client";

export async function logout(navigate: Function) {
  Cookie.remove('fauna-session')
  localStorage.removeItem("userId")
  navigate ? navigate('/sign_in') : window.location.reload()
}

export const LOGIN = gql`
  mutation UserLogin($email: String!, $password: String! ) {
    login(email: $email, password: $password) {
      ttl
      secret
      email
      userId
    }
  }
`;

export const SIGNUP = gql`
  mutation UserSignUp( $name: String!, $email: String!, $password: String! ) {
    registerUser(name: $name, email: $email, password: $password) {
      name
      email
    }
  }
`;