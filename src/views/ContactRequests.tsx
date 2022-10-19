import {useEffect, useState} from "react";
import EditableListWithSearch from "../components/EditableListWithSearch";
import BaseAvatar from "../components/BaseComponents/BaseAvatar";
import BaseButton from "../components/BaseComponents/BaseButton"
import {NetworkStatus} from '@apollo/client';
import BaseModal from '../components/BaseComponents/BaseModal';
import AddContactModal from "../components/AddContactModal";
import { useLoading } from "../contexts/LoadingContext";
import {useGetIncomingContactRequestsQuery, usePartialUpdateContactMutation} from "../generated/apollo-functions";
import { ContactStatus } from "../generated/types";

interface ShortContact {
  _id: string,
  name: string,
  userId: string
}

const Contacts = () => {
  const userId = localStorage.getItem("userId")
  const {setLoading} = useLoading();
  const [searchValue, setSearchValue] = useState('');
  const [contacts, setContacts] = useState<ShortContact[]>([]);
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

  const [updateContact, {loading: updatingContact}] = usePartialUpdateContactMutation();

  useEffect(()=> {
    if (data?.getIncomingContactRequests?.length) {
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
        <BaseButton
          variant="contained"
          buttonType="icon"
          onClick={() => {
            updateContact({
              variables: {
                id: contact._id!,
                data: {
                  status: ContactStatus.Accepted
                }
              }
            })
          }}
        >
          accept
        </BaseButton>
        <BaseButton
          variant="contained"
          buttonType="icon"
          onClick={() => {
            updateContact({
              variables: {
                id: contact._id!,
                data: {
                  status: ContactStatus.Declined
                }
              }
            })
          }}
        >
          decline
        </BaseButton>
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
    </div>
  )
}

export default Contacts;