import UserProfile from "../components/UserProfile";
import {gql, useQuery} from '@apollo/client';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { NetworkStatus } from '@apollo/client';

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
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <CircularProgress />
      </Box>
    )
  } else {
    return (
      <div className="p-4">
        <UserProfile user={data?.getUserById}/>
      </div>
    );
  }
}

export default Home