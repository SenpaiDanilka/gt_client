import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import EditableListWithSearch from "../components/EditableListWithSearch";
import BaseAvatar from "../components/BaseComponents/BaseAvatar";
import BaseMenu from "../components/BaseComponents/BaseMenu";
import {GET_INCOMING_CONTACT_REQUESTS} from '../services/UsersService'
import {NetworkStatus} from '@apollo/client';
import BaseModal from '../components/BaseComponents/BaseModal'
import AddContactModal from "../components/AddContactModal";
import { useLoading } from "../contexts/LoadingContext";
import SubmitActionModal from "../components/SubmitActionModal";
import {useDeleteContactMutation, useGetIncomingContactRequestsQuery} from "../generated/apollo-functions";
import {GetIncomingContactRequestsQuery} from "../generated/operations";

interface ShortContact {
  _id: string,
  name: string,
  userId: string
}

const Contacts = () => {
  const userId = localStorage.getItem("userId")
  const {setLoading, setAlertData} = useLoading();
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState('');
  const [contacts, setContacts] = useState<ShortContact[]>([]);
  const [isApproveModalOpen, setIsApproveModalOpen] = useState(false);
  const [deleteContactId, setDeleteContactId] = useState('');

  const handleOnDeleteClick = (id: string) => {
    setDeleteContactId(id);
    setIsApproveModalOpen(true);
  };
  const handleCancelDeleteClick = () => {
    setIsApproveModalOpen(false);
  };

  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  
  const {data, loading: contactsLoading, networkStatus} = useGetIncomingContactRequestsQuery({
    variables: {
      user_id: userId!
    },
    fetchPolicy: 'cache-and-network'
  });

  const [deleteItem, {loading: deleteLoading}] = useDeleteContactMutation();

  useEffect(()=> {
    if (data?.getIncomingContactRequests?.length) {
      setContacts(data.getIncomingContactRequests.map((request) => ({
        _id: request!._id,
        name: request!.user_one.name,
        userId: request!.user_one._id
      })))
    }
  }, [data]);

  const handleDelete = async () => {
    await deleteItem(
      {
        variables: {id: deleteContactId},
        update(cache, {data}) {
          const {getIncomingContactRequests} = cache.readQuery<GetIncomingContactRequestsQuery>({
            query: GET_INCOMING_CONTACT_REQUESTS,
            variables: {
              id: userId
            }
          }) || ({} as Partial<GetIncomingContactRequestsQuery>);
          cache.writeQuery({
            query: GET_INCOMING_CONTACT_REQUESTS,
            variables: {
              id: userId
            },
            data: {
              getIncomingContactRequests: {
                ...getIncomingContactRequests,
                contacts: {
                  ...getIncomingContactRequests,
                  data: getIncomingContactRequests?.filter((contact) => contact!._id !== data!.deleteContact!._id)
                }
              }
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
        },
      })
  };

  const menuOptions = (id: string) => ([
    {
      children: 'Delete',
      id: 'delete',
      onClick: () => handleOnDeleteClick(id)
    },
    {
      children: 'View profile',
      id: 'view',
      onClick: () => { navigate(`/contacts/${id}`) }
    }
  ]);

  useEffect(() => {
    setLoading(networkStatus === NetworkStatus.refetch || contactsLoading || deleteLoading)
  }, [networkStatus, contactsLoading, deleteLoading]);

  const List = (
    contacts.map((user) => (
      <div
        className="flex justify-between items-center"
        key={user._id}
      >
        <div className="flex items-center p-4">
          <BaseAvatar
            alt={`${user._id}`}
            size={40}
            className="mr-2"
          />
          {`${user.name}`}
        </div>
        <BaseMenu options={menuOptions(String(user._id))}/>
      </div>
    ))
  );

  return (
    <div className="p-4">
      <EditableListWithSearch
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        onAddClick={() => handleClickOpen()}
        list={List}
      />
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