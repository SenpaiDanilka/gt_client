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
  return (
    <div className="p-4">
      <p className="text-3xl pb-4 font-bold">Home</p>
      <UserProfile user={mockedUserData} />
    </div>
  );
}