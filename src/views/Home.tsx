import UserProfile from "../components/UserProfile";
import {gql, useQuery} from '@apollo/client';
import { NetworkStatus } from '@apollo/client';
import {BaseLoader} from "../components/BaseComponents/BaseLoader";

const GetUserByID = gql`
  query GetUserById($id: String!) {
    getUserById(id: $id) {
      name
      email
      spaces_count
      items_count
    }
  }
`;

const Home = () => {
  const userId = localStorage.getItem("userId")
  const {data, loading, networkStatus} = useQuery(GetUserByID, {
    variables: {
      id: userId
    }
  })

  if (networkStatus === NetworkStatus.refetch || loading) {
    return <BaseLoader />
  } else {
    return (
      <div className="p-4">
        <UserProfile user={data?.getUserById}/>
      </div>
    );
  }
}

export default Home