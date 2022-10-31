import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import { GET_USER_SPACES } from "../services/SpacesService";
import {NetworkStatus} from '@apollo/client';
import {useLoading} from "../contexts/LoadingContext";
import SubmitActionModal from "../components/SubmitActionModal";
import {useDeleteSpaceMutation, useFindUserSpacesByIdQuery} from "../generated/apollo-functions";
import {FindUserSpacesByIdQuery} from "../generated/operations";
import AddButton from "../components/AddButton";
import {useTranslation} from "react-i18next";
import SpaceCard from "../components/spaces/SpaceCard";

const Spaces = () => {
  const {t} = useTranslation(['common']);
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

  return (
    <div>
      <div id="controls" className="flex justify-end p-4">
        <AddButton text="Add Space" onClick={() => navigate('/spaces/new')} />
      </div>
      <div className="flex flex-wrap gap-5 md:gap-10 px-5 md:px-10">
        {
          spaces && spaces.map((space) => (
            <SpaceCard
              key={space!._id}
              space={space!}
              onDelete={() => handleOnDeleteClick(space!._id)}
            />
          ))
        }
      </div>
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