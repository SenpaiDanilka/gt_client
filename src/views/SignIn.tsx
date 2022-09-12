import React, { useState, useEffect } from 'react'
import { useMutation, gql } from '@apollo/client'
import { useNavigate } from "react-router-dom";
import Cookie from 'js-cookie';



const LOGIN = gql`
  mutation OwnerLogin($email: String!, $password: String! ) {
    login(email: $email, password: $password) {
      ttl
      secret
    }
  }
`;

export default function SignIn() {
  const [loginFunc, { data, loading, error }] = useMutation(LOGIN)
  const navigate = useNavigate();
    
  const [state, setState] = useState({
    email: '',
    password: ''
  })

  useEffect(() => {
    if(data) {
    Cookie.set(
      'fauna-session', 
      JSON.stringify(data.login),
      { expires: data.ttl }
    )
    navigate("/", { replace: true });
  }
    }, [data, navigate])
    
  const doLogin = (e: React.FormEvent) => {
    e.preventDefault();
    Cookie.remove('fauna-session')
    loginFunc({
      variables: {
        ...state
      }
    }).catch(e => console.log(e))   
  }

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setState({
        ...state,
        [e.target.name]: e.target.value
    })
  }

  return (
    <div>
      <div>
        <div className="uk-card uk-card-default uk-card-body">
          <h3 className="uk-card-title">Login</h3>
          {error ? 
              <div className="uk-alert-danger" uk-alert style={{ maxWidth: '300px', padding: '10px'}}>
                  Incorrect email and password
              </div> : null 
          }
          <form onSubmit={doLogin}>
            <div className="uk-margin">
              <input 
                className="uk-input" 
                type="text" 
                placeholder="Email" 
                name="email"
                onChange={handleChange}
                value={state.email}
              />
            </div>
              <div className="uk-margin">
                <input 
                  className="uk-input" 
                  type="password" 
                  placeholder="Password" 
                  name="password"
                  onChange={handleChange}
                  value={state.password}
                />
              </div>
              <div className="uk-margin">
                <input className="uk-input" type="submit" value={loading ? 'Submitting' : 'Submit'}/>
              </div>
          </form>
        </div>
      </div>
    </div>
  )
}
