import UserProfile from "../components/UserProfile";
import {UserType} from "../models/AuthModels";
import { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import Cookie from 'js-cookie'
import { useLazyQuery, gql } from '@apollo/client';

const mockedUserData: UserType = {
  name: "Mocked User",
  photo: "",
  email: "some email",
  contacts_count: 3,
  items_count: 11,
  spaces_count: 5,
  id: "1"
}

const FindUserByEmail = gql`
  query findUserByEmail($email: String!) {
    findUserByEmail(email: $email) {
      _id
      name
      email
      phone
      spaces {
        data {
          _id
          name
        }
      }
      items {
        data {
          _id
          name
        }
      }
    }
  }
`;

export default function Home() {
  const navigate = useNavigate()
  const cookies = Cookie.get('fauna-session');
  const [getCurrentUser, { data }] = useLazyQuery(FindUserByEmail);

  useEffect(() => {
    if(!cookies) {
      navigate('/sign_in')
    } else {
      getCurrentUser({
        variables: {
          email: "user1@gmail.com"
        }
      }).then(res => console.log(res));
    }
  }, [])

  return (
    <div className="p-4">
      <p className="text-3xl pb-4 font-bold">Home</p>
      <UserProfile user={mockedUserData} />
    </div>
  );
}