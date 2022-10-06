import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import EditableListWithSearch from "../components/EditableListWithSearch";
import BaseAvatar from "../components/BaseComponents/BaseAvatar";
import BaseMenu from "../components/BaseComponents/BaseMenu";
import {GET_USER_CONTACTS, DELETE_CONTACT} from '../services/UsersService'
import {NetworkStatus, useMutation, useQuery} from '@apollo/client';
import BaseModal from '../components/BaseComponents/BaseModal'
import AddContactModal from "../components/AddContactModal";
import { useLoading } from "../contexts/LoadingContext";

const Contacts = () => {
  const userId = localStorage.getItem("userId")
  const {setLoading, setAlertData} = useLoading();
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState('');
  const [contacts, setContacts] = useState([]);

  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  
  const {data, loading: contactsLoading, networkStatus} = useQuery(GET_USER_CONTACTS, {
    variables: {
      id: userId
    },
    fetchPolicy: 'cache-and-network'
  });

  useEffect(()=> {
    if (data?.findUserByID.contacts.data.length) {
      setContacts(data.findUserByID.contacts.data.map((contact: any) => ({
        _id: contact._id,
        name: contact.user.name,
        userId: contact.user._id
      })))
    }
  }, [data])

  const menuOptions = (id: string) => ([
    {
      children: 'Delete',
      id: 'delete',
      onClick: () => deleteItem({variables: {id}})
    },
    {
      children: 'View profile',
      id: 'view',
      onClick: () => { navigate(`/contacts/${id}`) }
    }
  ]);

  const [deleteItem, {loading: deleteLoading}] = useMutation(DELETE_CONTACT, {
    update(cache, {data: {deleteItem}}) {
      const {findUserByID} = cache.readQuery<any>({
        query: GET_USER_CONTACTS,
        variables: {
          id: userId
        }
      });
      cache.writeQuery({
        query: GET_USER_CONTACTS,
        variables: {
          id: userId
        },
        data: {
          findUserByID: {
            ...findUserByID,
            contacts: {
              ...findUserByID.contacts,
              data: findUserByID.contacts.data.filter((contact: any) => contact.user._id !== deleteItem._id)
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
  })

  useEffect(() => {
    setLoading(networkStatus === NetworkStatus.refetch || contactsLoading || deleteLoading)
  }, [networkStatus, contactsLoading, deleteLoading]);

  const List = (
    contacts.map((user: any) => (
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
        <AddContactModal/>
      </BaseModal>
    </div>
  )
}

export default Contacts;