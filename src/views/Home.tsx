import UserProfile from "../components/UserProfile";
import {UserType} from "../models/AuthModels";
import {gql, useQuery} from '@apollo/client';

const mockedUserData: UserType = {
  name: "Mocked User",
  photo: "",
  email: "some email",
  contacts_count: 3,
  items_count: 11,
  spaces_count: 5,
  id: "1"
}

const GetUserByID = gql`
  query GetUserById($id: String!) {
    getUserById(id: $id) {
      name
      email
      spacesCount
      itemsCount
    }
  }
`;

const Home = () => {
  const {data, loading} = useQuery(GetUserByID, {
    variables: {
      id: localStorage.getItem("userId")
      // id: "342861426893783248"
    }
  })

  return (
    <div className="p-4">
      <p className="text-3xl pb-4 font-bold">Home</p>
      {loading ? 'Тут должен рисоваться какой лоудер' : 'А тут твой компонент для отрисовки инфы пользователя с прокинутой в него инфой из data'}
      <UserProfile user={mockedUserData}/>
    </div>
  );
}

export default Home