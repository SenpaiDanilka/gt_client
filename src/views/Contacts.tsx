import {useState} from "react";
import {useNavigate} from "react-router-dom";
import EditableListWithSearch from "../components/EditableListWithSearch";
import BaseAvatar from "../components/BaseComponents/BaseAvatar";
import BaseMenu from "../components/BaseComponents/BaseMenu";
import {GET_USER_CONTACTS} from '../services/UsersService'
import {useQuery} from '@apollo/client';
import BaseModal from '../components/BaseComponents/BaseModal'
import AddContactModal from "../components/AddContactModal";

const Contacts = () => {
  const userId = localStorage.getItem("userId")
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState('');

  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const {data} = useQuery(GET_USER_CONTACTS, {
    variables: {
      id: userId
    },
    fetchPolicy: 'cache-and-network'
  });
  const menuOptions = (id: string) => ([
    {
      children: 'Delete',
      id: 'delete',
      onClick: () => {console.log(`delete user ${id}`)}
    },
    {
      children: 'View profile',
      id: 'view',
      onClick: () => { navigate(`/contacts/${id}`) }
    }
  ]);

  const List = (
    data?.findUserByID?.contacts.data.map((user: any) => (
      <div
        className="flex justify-between items-center"
        key={user._id}
      >
        <div className="flex items-center p-4">
          <BaseAvatar
            alt={`Mocked User ${user._id}`}
            size={40}
            className="mr-2"
          />
          {`Mocked User ${user.name}`}
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