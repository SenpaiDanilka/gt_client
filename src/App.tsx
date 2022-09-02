import { useMutation, gql } from "@apollo/client";
import { MouseEvent } from "react";

const LOGIN = gql`
  mutation UserLogin($email: String!, $password: String! ) {
    login(email: $email, password: $password) {
      ttl
      secret
      email
    }
  }
`;

export default function Home() {

  const [loginFunc, { loading, error }] = useMutation(LOGIN)

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    console.error(error);
    return null;
  }

  const doLogin = (e: MouseEvent) => {
    e.preventDefault();
    loginFunc({
        variables: {
          email: 'danya@gmail.com',
          password: 'Pass1234',
        }
    })
    .then(resp => console.log('==>', resp))
    .catch(e => console.log(e))   
  }

  return (
    <div>
      <button onClick={doLogin}>Login</button>
    </div>
  )
}