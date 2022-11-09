import React, {useEffect, useState} from "react";
import EditableListWithSearch from "../components/EditableListWithSearch";
import BaseAvatar from "../components/BaseComponents/BaseAvatar";
import BaseButton from "../components/BaseComponents/BaseButton"
import {NetworkStatus} from '@apollo/client';
import { useLoading } from "../contexts/LoadingContext";
import {useGetIncomingContactRequestsQuery, usePartialUpdateContactMutation} from "../generated/apollo-functions";
import { ContactStatus } from "../generated/types";
import { ShortContact } from "../models/ContactModels";
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';
import Tooltip from "@mui/material/Tooltip";
import SubmitActionModal from "../components/SubmitActionModal";
import {GetIncomingContactRequestsQuery, GetIncomingContactRequestsQueryVariables} from "../generated/operations";
import {GET_INCOMING_CONTACT_REQUESTS} from "../services/UsersService";

const Contacts = () => {
  const userId = localStorage.getItem("userId")
  const {setLoading, setAlertData} = useLoading();
  const [searchValue, setSearchValue] = useState('');
  const [contacts, setContacts] = useState<ShortContact[]>([]);
  const [isApproveModalOpen, setIsApproveModalOpen] = useState(false);

  const {data, loading: contactsLoading, networkStatus} = useGetIncomingContactRequestsQuery({
    variables: {
      user_id: userId!
    },
    fetchPolicy: 'cache-and-network'
  });

/*  const handleClick = (id: string) => {
    setIsApproveModalOpen(true);
  };
  const handleCancelClick = () => {
    setIsApproveModalOpen(false);
  };*/

  const [updateContact, {loading: updatingContact}] = usePartialUpdateContactMutation();

  useEffect(()=> {
    if (data?.getIncomingContactRequests) {
      setContacts(data.getIncomingContactRequests.map((request) => ({
        _id: request!._id,
        name: request!.user_one.name,
        userId: request!.user_one._id
      })))
    }
  }, [data]);

  useEffect(() => {
    setLoading(networkStatus === NetworkStatus.refetch || contactsLoading || updatingContact)
  }, [networkStatus, contactsLoading, updatingContact]);

  const handleClick = async (id: string, status: ContactStatus) => {
    await updateContact({
      variables: {
        id: id,
        data: {
          status: status
        }
      },
      update(cache, {data}) {
        const { getIncomingContactRequests } = cache.readQuery<GetIncomingContactRequestsQuery, GetIncomingContactRequestsQueryVariables>({
          query: GET_INCOMING_CONTACT_REQUESTS,
          variables: {
            user_id: userId!
          }
        }) || ({} as Partial<GetIncomingContactRequestsQuery>);
        cache.writeQuery<GetIncomingContactRequestsQuery, GetIncomingContactRequestsQueryVariables>({
          query: GET_INCOMING_CONTACT_REQUESTS,
          variables: {
            user_id: userId!
          },
          data: {
            getIncomingContactRequests: getIncomingContactRequests!.filter((contact) => contact!._id !== data!.partialUpdateContact!._id)
          }
        });
      },
      onQueryUpdated: () => {
        setAlertData({
          isOpen: true,
          text: 'Contact has been deleted',
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
  };

  const List = (
    contacts.map((contact) => (
      <div
        className="flex justify-between items-center"
        key={contact._id}
      >
        <div className="flex items-center p-4">
          <BaseAvatar
            alt={`${contact._id}`}
            size={40}
            className="mr-2"
          />
          {`${contact.name}`}
        </div>
        <div className="mr-2">
          <Tooltip title={'Accept'}>
            <BaseButton
              buttonType="icon"
              onClick={() => handleClick(contact!._id, ContactStatus.Accepted)}
            >
              <DoneIcon />
            </BaseButton>
          </Tooltip>
          <Tooltip title={'Decline'}>
            <BaseButton
              buttonType="icon"
              onClick={() => handleClick(contact!._id, ContactStatus.Declined)}
            >
              <CloseIcon />
            </BaseButton>
          </Tooltip>
        </div>
      </div>
    ))
  );

  return (
    <div className="p-4">
      <EditableListWithSearch
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        list={List}
      />
{/*      <SubmitActionModal
        open={isApproveModalOpen}
        onSubmit={handleUpdate}
        onCancel={ha}
      >
        <p className="mb-4">Approve or Decline?</p>
      </SubmitActionModal>*/}
    </div>
  )
}

export default Contacts;