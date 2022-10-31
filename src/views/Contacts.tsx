import React, {useEffect, useState} from "react";
import EditableListWithSearch from "../components/EditableListWithSearch";
import BaseAvatar from "../components/BaseComponents/BaseAvatar";
import BaseMenu from "../components/BaseComponents/BaseMenu";
import {GET_CONTACTS_BY_USER_ID, GET_SENT_CONTACT_REQUESTS} from '../services/UsersService'
import {ApolloCache, NetworkStatus} from '@apollo/client';
import BaseModal from '../components/BaseComponents/BaseModal'
import AddContactModal from "../components/AddContactModal";
import { useLoading } from "../contexts/LoadingContext";
import SubmitActionModal from "../components/SubmitActionModal";
import {useDeleteContactMutation, useGetContactsByUserIdQuery, useGetSentContactRequestsQuery} from "../generated/apollo-functions";
import {
  DeleteContactMutation,
  GetContactsByUserIdQuery,
  GetContactsByUserIdQueryVariables,
  GetSentContactRequestsQuery, GetSentContactRequestsQueryVariables
} from "../generated/operations";
import { ShortContact } from "../models/ContactModels";
import { useTranslation } from "react-i18next";
import Tooltip from "@mui/material/Tooltip";
import BaseButton from "../components/BaseComponents/BaseButton";
import CloseIcon from '@mui/icons-material/Close';
import AddButton from "../components/AddButton";

const Contacts = () => {
  const {t} = useTranslation(['contacts', 'common']);
  const userId = localStorage.getItem("userId")
  const {setLoading, setAlertData} = useLoading();
  const [searchValue, setSearchValue] = useState('');
  const [contacts, setContacts] = useState<ShortContact[]>([]);
  const [sentRequests, setSentRequests] = useState<ShortContact[]>([]);
  const [isApproveModalOpen, setIsApproveModalOpen] = useState(false);
  const [deleteContactId, setDeleteContactId] = useState('');

  const handleOnDeleteClick = (id: string) => {
    setDeleteContactId(id);
    setIsApproveModalOpen(true);
  };
  const handleCancelDeleteClick = () => {
    setIsApproveModalOpen(false);
  };

  const [tab, setTab] = useState(0);
  const handleSetTab = (event: React.SyntheticEvent, newValue: number) => {
    setTab(newValue);
  };

  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  
  const [deleteItem, {loading: deleteLoading}] = useDeleteContactMutation();

  const {data, loading: contactsLoading, networkStatus} = useGetContactsByUserIdQuery({
    variables: {
      user_id: userId!
    },
    fetchPolicy: 'cache-and-network'
  });
  
  useEffect(()=> {
    if (data?.getContactsByUserId) {
      setContacts(data.getContactsByUserId.map((contact) => {
        const user = contact.user_two;
        return {
          _id: contact!._id,
          name: user.name,
          userId: user._id,
          email: user.email
        };
      }))
    } else {
      setContacts([]);
    }
  }, [data]);

  const {data: sentRequestsData, loading: sentRequestsLoading} = useGetSentContactRequestsQuery({
    variables: {
      user_id: userId!
    },
    fetchPolicy: 'cache-and-network'
  });
  
  useEffect(()=> {
    if (sentRequestsData?.getSentContactRequests) {
      setSentRequests(sentRequestsData.getSentContactRequests.map((contact) => {
        const user = contact.user_two;
        return {
          _id: contact._id,
          name: user.name,
          userId: user._id,
          status: contact.status,
          email: user.email
        };
      }))
    }
  }, [sentRequestsData]);

  const updateContacts = (cache: ApolloCache<any>, data?: DeleteContactMutation | null) => {
    const {getContactsByUserId} = cache.readQuery<GetContactsByUserIdQuery, GetContactsByUserIdQueryVariables>({
      query: GET_CONTACTS_BY_USER_ID,
      variables: {
        user_id: userId!
      }
    }) || ({} as Partial<GetContactsByUserIdQuery>);
    cache.writeQuery<GetContactsByUserIdQuery, GetContactsByUserIdQueryVariables>({
      query: GET_CONTACTS_BY_USER_ID,
      variables: {
        user_id: userId!
      },
      data: {
        getContactsByUserId: getContactsByUserId!.filter((contact) => contact!._id !== data!.deleteContact!._id)
      }
    });
  };

  const updateSentContacts = (cache: ApolloCache<any>, data?: DeleteContactMutation | null) => {
    const {getSentContactRequests} = cache.readQuery<GetSentContactRequestsQuery, GetSentContactRequestsQueryVariables>({
      query: GET_SENT_CONTACT_REQUESTS,
      variables: {
        user_id: userId!
      }
    }) || ({} as Partial<GetSentContactRequestsQuery>);
    cache.writeQuery<GetSentContactRequestsQuery, GetSentContactRequestsQueryVariables>({
      query: GET_SENT_CONTACT_REQUESTS,
      variables: {
        user_id: userId!
      },
      data: {
        getSentContactRequests: getSentContactRequests!.filter((contact) => contact!._id !== data!.deleteContact!._id)
      }
    });
  };

  const handleDelete = async () => {
    await deleteItem(
      {
        variables: {id: deleteContactId},
        update(cache, {data}) {
          tab
            ? updateSentContacts(cache, data)
            : updateContacts(cache, data);
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
      })
  };

  const menuOptions = (id: string) => ([
    {
      children: 'Resend',
      id: 'resend',
      onClick: () => { console.log('resend to id', id) }
    },
    {
      children: 'Delete',
      id: 'delete',
      onClick: () => handleOnDeleteClick(id)
    },
  ]);

  useEffect(() => {
    setLoading(networkStatus === NetworkStatus.refetch || contactsLoading || sentRequestsLoading || deleteLoading);
  }, [networkStatus, contactsLoading, deleteLoading, sentRequestsLoading]);

  return (
    <div className="p-4">
      <div id="controls" className="flex justify-end mb-4">
        <AddButton text="Add contact" onClick={handleClickOpen} />
      </div>

      <div className="mb-10">
        <p className="text-xl font-semibold text-mgb dark:text-white">
          {`${t('sent_requests')} (${sentRequests.length})`}
        </p>
        {
          sentRequests.map((contact) => (
            <div
              className="flex justify-between items-center text-base"
              key={contact._id}
            >
              <div className="flex items-center p-4">
                <BaseAvatar
                  alt={`${contact._id}`}
                  size={24}
                  className="mr-2"
                />
                <span className="text-dgb dark:text-white">{contact.email}</span>
              </div>
              <span className="text-gb">{t(`contactStatus.${contact.status}`)}</span>
              <BaseMenu options={menuOptions(String(contact._id))}/>
            </div>
          ))
        }
      </div>

      <div>
        <p className="text-xl font-semibold text-mgb dark:text-white">
          {`${t('contacts')} (${contacts.length})`}
        </p>
        {
          contacts.map((contact) => (
            <div
              className="flex justify-between items-center text-base"
              key={contact._id}
            >
              <div className="flex items-center p-4">
                <BaseAvatar
                  alt={`${contact._id}`}
                  size={24}
                  className="mr-2"
                />
                <span className="text-dgb dark:text-white">{contact.name}</span>
              </div>
              <span className="text-gb">{contact.email}</span>
              <Tooltip title={t('delete', { ns: 'common' })}>
                <BaseButton
                  buttonType="icon"
                  size="small"
                  className="text-gb hover:text-blue dark:hover:text-white"
                  onClick={() => handleOnDeleteClick(contact._id)}
                >
                  <CloseIcon className="text-3xl md:text-xl" />
                </BaseButton>
              </Tooltip>
            </div>
          ))
        }
      </div>

      <BaseModal
        open={open}
        onClose={handleClose}
      >
        <AddContactModal handleClose={handleClose} />
      </BaseModal>
      <SubmitActionModal
        open={isApproveModalOpen}
        onSubmit={handleDelete}
        onCancel={handleCancelDeleteClick}
      >
        <p className="mb-4">Delete contact ID: {
          <span className="font-bold">{deleteContactId}</span>
        }?</p>
      </SubmitActionModal>
    </div>
  )
}

export default Contacts;