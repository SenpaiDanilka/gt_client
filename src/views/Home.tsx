import UserProfile from "../components/UserProfile";
import { NetworkStatus } from '@apollo/client';
import {useLoading} from "../contexts/LoadingContext";
import {useEffect} from "react";
import {useGetUserByIdQuery, useGetItemsQuery} from "../generated/apollo-functions";
import {useParams} from "react-router-dom";

const Home = () => {
  const { id } = useParams();
  const userId = localStorage.getItem("userId")
  const {data, loading, networkStatus} = useGetUserByIdQuery({
    variables: {
      id: id ? id : userId!
    }
  });
  const {data: getItemsData, loading: getItemsLoading} = useGetItemsQuery({
    variables: {
      user_id: userId!
    },
    fetchPolicy: 'cache-and-network'
  });
  const { setLoading } = useLoading();

  useEffect(() => {
    setLoading(networkStatus === NetworkStatus.refetch || loading)
  }, [networkStatus, loading]);

  return (
    <div className="p-4">
      {
        data && <UserProfile user={data!.getUserById!}/>
      }
    </div>
  );
}

export default Home