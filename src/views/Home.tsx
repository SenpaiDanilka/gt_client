import UserProfile from "../components/UserProfile";
import {gql, useQuery} from '@apollo/client';
import { NetworkStatus } from '@apollo/client';
import {useLoading} from "../contexts/LoadingContext";
import {useEffect} from "react";

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
  });
  const { setLoading } = useLoading();

  useEffect(() => {
    setLoading(networkStatus === NetworkStatus.refetch || loading)
  }, [networkStatus, loading]);

  return (
    <div className="p-4">
      {
        data && <UserProfile user={data?.getUserById}/>
      }
    </div>
  );
}

export default Home