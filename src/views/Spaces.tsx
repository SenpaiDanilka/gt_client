import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import { GET_SPACES_BY_USER_ID } from "../services/SpacesService";
import {NetworkStatus} from '@apollo/client';
import {useLoading} from "../contexts/LoadingContext";
import SubmitActionModal from "../components/SubmitActionModal";
import {
  useDeleteSpaceMutation,
  useGetSpacesByUserIdQuery, useGetUserByIdQuery
} from "../generated/apollo-functions";
import {GetSpacesByUserIdQuery} from "../generated/operations";
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
  const {refetch: refetchUserData} = useGetUserByIdQuery({
    variables: {
      id: userId!
    }
  });

  const handleOnDeleteClick = (id: string) => {
    setDeleteSpaceId(id);
    setIsApproveModalOpen(true);
  };
  const handleCancelDeleteClick = () => {
    setIsApproveModalOpen(false);
  };

  const {data, networkStatus} = useGetSpacesByUserIdQuery({
    variables: {
      user_id: userId!
    },
    fetchPolicy: 'cache-and-network'
  });

  const spaces = data?.getSpacesByUserId;

  const [deleteSpace] = useDeleteSpaceMutation({
    variables: {id: deleteSpaceId},
    update(cache, {data}) {
      const {getSpacesByUserId} = cache.readQuery<GetSpacesByUserIdQuery>({
        query: GET_SPACES_BY_USER_ID,
        variables: {
          user_id: userId
        }
      }) || ({} as Partial<GetSpacesByUserIdQuery>);
      cache.writeQuery({
        query: GET_SPACES_BY_USER_ID,
        variables: {
          user_id: userId
        },
        data: {
          getSpacesByUserId: getSpacesByUserId?.filter((space) => space!.id !== data!.deleteSpace!._id)
        }
      });
    },
    onQueryUpdated: async () => {
      await refetchUserData();
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

  return (
    <div>
      <div id="controls" className="flex justify-end p-4">
        <AddButton text="Add Space" onClick={() => navigate('/spaces/new')} />
      </div>
      <div className="flex flex-wrap gap-5 md:gap-10 px-5 md:px-10">
        {
          spaces && spaces.map((space) => (
            <SpaceCard
              key={space!.id}
              space={space!}
              onDelete={() => handleOnDeleteClick(space!.id)}
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