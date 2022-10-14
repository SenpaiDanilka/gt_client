import UserProfile from "../components/UserProfile";
import { NetworkStatus } from '@apollo/client';
import {useLoading} from "../contexts/LoadingContext";
import {useEffect} from "react";
import {useGetUserByIdQuery} from "../generated/apollo-functions";

const Home = () => {
  const userId = localStorage.getItem("userId")
  const {data, loading, networkStatus} = useGetUserByIdQuery({
    variables: {
      id: userId!
    }
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