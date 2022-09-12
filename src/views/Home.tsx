import { useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import Cookie from 'js-cookie'

export default function Home() {
  const navigate = useNavigate()
  const cookies = Cookie.get('fauna-session');

  useEffect(() => {
    if(!cookies) {
      navigate('/sign_in')
    } 
  }, [cookies, navigate])

  return <div>Home</div>
}