import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import UserProfile from "../components/UserProfile";
import {User} from "../models/AuthModels";

export default function Contact() {
  const { id } = useParams();
  const [userData, setUserData] = useState(new User())

  const getContactData = () => {
    return (new User({
      name: "Contact mocked User",
      email: "some email",
      contacts_count: 1,
      items_count: 2,
      spaces_count: 3
    }));
  };

  useEffect(() => {
    setUserData(getContactData());
  }, [setUserData]);

  return (
    <div className="p-4">
      <p className="text-3xl pb-4 font-bold">{ `User ${id}` }</p>
      <UserProfile user={userData} />
    </div>
  );
}