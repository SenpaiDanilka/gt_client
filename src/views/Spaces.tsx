import EditableListWithSearch from "../components/EditableListWithSearch";
import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import BaseMenu from "../components/BaseComponents/BaseMenu";
import { DELETE_SPACE, GET_USER_SPACES } from "../services/SpacesService";
import {NetworkStatus, useMutation, useQuery} from '@apollo/client';
import {useLoading} from "../contexts/LoadingContext";

const Spaces = () => {
  const userId = localStorage.getItem("userId")
  const navigate = useNavigate();
  const {setLoading, setAlertData} = useLoading();
  const [searchValue, setSearchValue] = useState('');

  const {data, networkStatus} = useQuery(GET_USER_SPACES, {
    variables: {
      id: userId
    },
    fetchPolicy: 'cache-and-network'
  });
  const spaces = data?.findUserByID?.spaces.data;

  const [deleteSpace] = useMutation(DELETE_SPACE, {
    update(cache, {data: {deleteSpace}}) {
      const {findUserByID} = cache.readQuery<any>({
        query: GET_USER_SPACES,
        variables: {
          id: userId
        }
      });
      cache.writeQuery({
        query: GET_USER_SPACES,
        variables: {
          id: userId
        },
        data: {
          findUserByID: {
            ...findUserByID,
            spaces: {
              ...findUserByID.spaces,
              data: findUserByID.spaces.data.filter((space: any) => space._id !== deleteSpace._id)
            }
          }
        }
      });
    },
    onQueryUpdated: () => {
      setAlertData({
        isOpen: true,
        text: 'Item has been deleted',
        type: 'success'
      });
    },
    onError: () => {
      setAlertData({
        isOpen: true,
        text: 'Smth went wrong',
        type: 'error'
      });
    }
  });

  useEffect(() => {
    setLoading(networkStatus === NetworkStatus.loading)
  }, [networkStatus]);

  const menuOptions = (id: string) => ([
    {
      children: 'Delete',
      id: 'delete',
      onClick: () => {
        deleteSpace({
          variables: {
            id: id
          }
        }).then(res => {
          console.log(`delete space ${res}`)
        })
      }
    },
    {
      children: 'View space',
      id: 'view',
      onClick: () => { navigate(`/spaces/${id}`) }
    }
  ]);

  const List = (
    spaces && spaces.map((space: any) => (
      <div
        className="flex justify-between items-center"
        key={space._id}
      >
        <div className="flex justify-between p-4 w-full">
          <span>{`${space.name}`}</span>
          {space.description && <span>{`${space.description}`}</span>}
          {/* <span className="font-bold">{ `IC: ${value * 2} / UC: ${value * 3}` }</span> */}
        </div>
        <BaseMenu options={menuOptions(String(space._id))}/>
      </div>
    ))
  );

  return (
    <div className="p-4">
      <EditableListWithSearch
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        onAddClick={() => navigate('/spaces/new')}
        list={List}
      />
    </div>
  )
}

export default Spaces;