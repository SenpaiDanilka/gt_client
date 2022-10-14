import EditableListWithSearch from "../components/EditableListWithSearch";
import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import BaseMenu from "../components/BaseComponents/BaseMenu";
import { GET_USER_SPACES } from "../services/SpacesService";
import {NetworkStatus} from '@apollo/client';
import {useLoading} from "../contexts/LoadingContext";
import SubmitActionModal from "../components/SubmitActionModal";
import {useDeleteSpaceMutation, useFindUserSpacesByIdQuery} from "../generated/apollo-functions";
import {FindUserSpacesByIdQuery} from "../generated/operations";

const Spaces = () => {
  const userId = localStorage.getItem("userId")
  const navigate = useNavigate();
  const {setLoading, setAlertData} = useLoading();
  const [searchValue, setSearchValue] = useState('');
  const [isApproveModalOpen, setIsApproveModalOpen] = useState(false);
  const [deleteSpaceId, setDeleteSpaceId] = useState('');

  const handleOnDeleteClick = (id: string) => {
    setDeleteSpaceId(id);
    setIsApproveModalOpen(true);
  };
  const handleCancelDeleteClick = () => {
    setIsApproveModalOpen(false);
  };

  const {data, networkStatus} = useFindUserSpacesByIdQuery({
    variables: {
      id: userId!
    },
    fetchPolicy: 'cache-and-network'
  });
  const spaces = data?.findUserByID?.spaces.data;

  const [deleteSpace] = useDeleteSpaceMutation({
    variables: {id: deleteSpaceId},
    update(cache, {data}) {
      const {findUserByID} = cache.readQuery<FindUserSpacesByIdQuery>({
        query: GET_USER_SPACES,
        variables: {
          id: userId
        }
      }) || ({} as Partial<FindUserSpacesByIdQuery>);
      cache.writeQuery({
        query: GET_USER_SPACES,
        variables: {
          id: userId
        },
        data: {
          findUserByID: {
            ...findUserByID,
            spaces: {
              ...findUserByID?.spaces,
              data: findUserByID?.spaces.data.filter((space) => space!._id !== data!.deleteSpace!._id)
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
      setIsApproveModalOpen(false);
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
      onClick: () => handleOnDeleteClick(id)
    },
    {
      children: 'View space',
      id: 'view',
      onClick: () => { navigate(`/spaces/${id}`) }
    }
  ]);

  const List = (
    spaces && spaces.map((space) => (
      <div
        className="flex justify-between items-center"
        key={space!._id}
      >
        <div className="flex justify-between p-4 w-full">
          <span>{`${space!.name}`}</span>
          {space!.description && <span>{`${space!.description}`}</span>}
          {/* <span className="font-bold">{ `IC: ${value * 2} / UC: ${value * 3}` }</span> */}
        </div>
        <BaseMenu options={menuOptions(String(space!._id))}/>
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
      <SubmitActionModal
        open={isApproveModalOpen}
        onSubmit={deleteSpace}
        onCancel={handleCancelDeleteClick}
      >
        <p className="mb-4">Delete space ID: {
          <span className="font-bold">{deleteSpaceId}</span>
        }?</p>
      </SubmitActionModal>
    </div>
  )
}

export default Spaces;