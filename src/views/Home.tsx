import { useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import Cookie from 'js-cookie'
import UserProfile from "../components/UserProfile";
import {UserType} from "../models/AuthModels";

const mockedUserData: UserType = {
  name: "Mocked User",
  photo: "",
  email: "some email",
  contacts_count: 3,
  items_count: 11,
  spaces_count: 5
}

export default function Home() {
  const navigate = useNavigate();
  const cookies = Cookie.get('fauna-session');

/*  useEffect(() => {
    if(!cookies) {
      navigate('/sign_in')
    } 
  }, [cookies, navigate])*/

  return (
    <div className="bg-gray-100 h-screen w-screen p-4">
      <p className="text-3xl pb-4 font-bold">Home</p>
      <UserProfile user={mockedUserData} />
    </div>
  );
}