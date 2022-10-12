import React, {ReactNode, useEffect, useMemo, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import BaseContainer from "../components/BaseComponents/BaseContainer";
import {Tab, Tabs} from "@mui/material";
import {useTranslation} from "react-i18next";
import BaseAvatar from "../components/BaseComponents/BaseAvatar";
import BaseMenu from "../components/BaseComponents/BaseMenu";
import PopperWithAutocomplete, {OptionsDataType} from "../components/PopperWithAutocomplete";
import AddButton from "../components/AddButton";
import {useLoading} from "../contexts/LoadingContext";
import {DELETE_SPACE, FIND_SPACE_BY_ID, UPDATE_SPACE, CREATE_SPACE_CONTACT_LINK, DELETE_SPACE_CONTACT_LINK} from "../services/SpacesService";
import {CREATE_AVAILABLE_ITEM, GET_USER_ITEMS, GET_SPACE_ITEMS, DELETE_ITEM_FROM_SPACE} from "../services/ItemsService";
import {GET_USER_CONTACTS} from '../services/UsersService'
import {useQuery, useMutation} from '@apollo/client';
import EntityActions from "../components/EntityActions";
import EditSpaceForm from "../components/spaces/EditSpaceForm";
import {FormDataType} from "../models/CommonModels";
import { AvailabilityModel } from "../models/ItemsModels";

export default function Space() {
  const {id} = useParams();
  const userId = localStorage.getItem('userId')
  const navigate = useNavigate();
  const {t} = useTranslation('common');
  const [tab, setTab] = useState(0);
  const [availableItems, setAvailableItems] = useState<OptionsDataType[]>([]);
  const [availableUsers, setAvailableUsers] = useState<OptionsDataType[]>([]);
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
  const [spaceItems, setSpaceItems] = useState<OptionsDataType[]>([]);
  const [spaceUsers, setSpaceUsers] = useState<OptionsDataType[]>([]);
  const {setLoading, setAlertData} = useLoading();
  const [isEdit, setIsEdit] = useState(false);

  const {data: findSpaceByIdData, loading: spaceLoading, error: getSpaceError} = useQuery(FIND_SPACE_BY_ID, {
    variables: {
      id: id
    }
  });

  useEffect(() => {
    if (findSpaceByIdData?.findSpaceByID.contacts.data.length) {
      setSpaceUsers(findSpaceByIdData?.findSpaceByID.contacts.data.map((contactLink: any) => ({
        _id: contactLink._id,
        name: contactLink.contact.user.name,
        optionId: contactLink.contact.user._id
      })))
    }
  }, [findSpaceByIdData])

  const {data: userContactsData, loading: userContactsLoading} = useQuery(GET_USER_CONTACTS, {
    variables: {
      id: userId
    }
  });

  useEffect(() => {
    if (userContactsData?.findUserByID.contacts.data.length) {
      setAvailableUsers(userContactsData?.findUserByID.contacts.data.map((contact: any) => ({
        _id: contact._id,
        name: contact.user.name,
        optionId: contact.user._id
      })))
    }
  }, [userContactsData])

  const {data: userItemsData, loading: getUserItemsLoading} = useQuery(GET_USER_ITEMS, {
    variables: {
      id: userId
    }
  })

  useEffect(() => {
    if (userItemsData?.findUserByID.items.data.length) {
      setAvailableItems(userItemsData.findUserByID.items.data)
    }
  }, [userItemsData])

  const {data: spaceItemsData, loading: getSpaceItemsLoading} = useQuery(GET_SPACE_ITEMS, {
    variables: {
      model: AvailabilityModel.SPACE,
      model_id: id
    }
  })

  useEffect(() => {
    if (spaceItemsData?.getModelItems.length) {
      setSpaceItems(spaceItemsData?.getModelItems.map((availableItem: any) => ({
        _id: availableItem._id,
        name: availableItem.item.name,
        description: availableItem.item.description,
        type: availableItem.item.type,
        optionId: availableItem.item._id
      })))
    }
  }, [spaceItemsData])

  const [deleteSpace, {loading: deleteLoading, error: deleteSpaceError}] = useMutation(DELETE_SPACE);
  const [updateSpace, {loading: editLoading, error: editError}] = useMutation(UPDATE_SPACE, {
    onQueryUpdated: () => {
      setAlertData({
        isOpen: true,
        text: 'Space has been updated',
        type: 'success'
      });
      toggleEditSpace();
    }
  });

  useEffect(() => {
    setLoading(
      deleteLoading ||
      editLoading ||
      spaceLoading ||
      getSpaceItemsLoading ||
      getUserItemsLoading ||
      userContactsLoading
    );
    return () => setLoading(false);
  }, [
    deleteLoading,
    editLoading,
    spaceLoading,
    getUserItemsLoading,
    getSpaceItemsLoading,
    userContactsLoading
  ]);

  useEffect(() => {
    (getSpaceError || deleteSpaceError || editError) && setAlertData({
      isOpen: true,
      text: 'Smth went wrong',
      type: 'error'
    });
  }, [getSpaceError, deleteSpaceError, editError]);

  const toggleEditSpace = () => {
    setIsEdit(!isEdit);
  };

  const handleDeleteSpace = () => {
    deleteSpace({
      variables: {
        id: id
      }
    }).then(() => {
      setAlertData({
        isOpen: true,
        text: 'Item has been deleted',
        type: 'success'
      });
      navigate('/spaces');
    })
  };

  const handleEditSpace = async (formData: FormDataType) => {
    await updateSpace({
      variables: {
        id: id,
        data: {
          name: formData.name.value,
          description: formData.description.value
        }
      }
    });
  };

  const handleSetTab = (event: React.SyntheticEvent, newValue: number) => {
    setTab(newValue);
  };

  const handleAddClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const memoizedAvailableItems = useMemo(() => {
    return availableItems
      .filter(item => spaceItems
        .findIndex(spaceItem => spaceItem.optionId === item._id) === -1);
  }, [spaceItems, availableItems]);

  const memoizedAvailableUsers = useMemo(() => {
    return availableUsers
      .filter(item => spaceUsers
        .findIndex(spaceUser => spaceUser.optionId === item.optionId) === -1);
  }, [spaceUsers, availableUsers]);

  const handleSelect = (val: OptionsDataType | null, key: string) => {
    if (key === 'items') {
      createAvailableItem({
        variables: {
          model: AvailabilityModel.SPACE,
          model_id: id,
          item_id: val!._id
        }
      }).then((res: any) => {
        setSpaceItems(current => {
          return [...current, {
            _id: res.data.createAvailableItem._id,
            name: res.data.createAvailableItem.item.name,
            description: res.data.createAvailableItem.item.description,
            type: res.data.createAvailableItem.item.type,
            optionId: res.data.createAvailableItem.item._id
          }];
        });
      })
    }
    if (key === 'users') {
      createSpaceContactLink({
        variables: {
          data: {
            space: {
              connect: id
            },
            contact: {
              connect: val!._id
            }
          }
        }
      }).then((res: any) => {
        setSpaceUsers(current => {
          return [...current, {
            _id: res.data.createSpaceContactLink._id,
            name: res.data.createSpaceContactLink.contact.user.name,
            optionId: res.data.createSpaceContactLink.contact.user._id
          }];
        });
      })
    }
  }

  const deleteFromSpace = (id: string) => {
    tab === 0
      ? deleteItemFromSpace({
        variables: {
          id: id
        }
      }).then(_ => {
        setSpaceItems((current) =>
          current.filter((item) => item._id !== id))
      })
      : deleteContactFromSpace({
        variables: {
          id: id
        }
      }).then(_ => {
        setSpaceUsers((current) =>
          current.filter((item) => item._id !== id))
      })
    setAlertData({
      isOpen: true,
      text: 'Has been deleted',
      type: 'success'
    });
  };

  const [createSpaceContactLink] = useMutation(CREATE_SPACE_CONTACT_LINK);

  const [createAvailableItem] = useMutation(CREATE_AVAILABLE_ITEM);

  const [deleteItemFromSpace] = useMutation(DELETE_ITEM_FROM_SPACE);

  const [deleteContactFromSpace] = useMutation(DELETE_SPACE_CONTACT_LINK);

  return (
    <div className="p-4">
      <BaseContainer className="p-4 relative">
        {
          isEdit
            ? (
              <EditSpaceForm
                onSubmit={handleEditSpace}
                onCancel={toggleEditSpace}
                editData={{
                  name: findSpaceByIdData.findSpaceByID.name,
                  description: findSpaceByIdData.findSpaceByID.description
                }}
              />
            ) : (
              <>
                {
                  findSpaceByIdData && findSpaceByIdData.findSpaceByID &&
                  <>
                    <div className="flex flex-col space-y-4 mb-2">
                      <span>{findSpaceByIdData.findSpaceByID.name}</span>
                      <span>{findSpaceByIdData.findSpaceByID.description}</span>
                    </div>
                    <div className="flex justify-center items-center">
                      {
                        tab === 0 && (
                          <>
                            <AddButton
                              onClick={handleAddClick}
                              className="mr-2 w-7 h-7"
                            />
                            <PopperWithAutocomplete
                              options={memoizedAvailableItems}
                              anchorEl={anchorEl}
                              handleClose={handleClose}
                              handleSelect={(val) => handleSelect(val, 'items')}
                            />
                          </>
                        )
                      }
                      <Tabs
                        value={tab}
                        onChange={handleSetTab}
                        centered
                        className="max-w-[300px]"
                      >
                        <Tab label={t('items')} className="normal-case text-xl"/>
                        <Tab label={t('users')} className="normal-case text-xl"/>
                      </Tabs>
                      {
                        tab === 1 && (
                          <>
                            <AddButton
                              onClick={handleAddClick}
                              className="ml-2 w-7 h-7"
                            />
                            <PopperWithAutocomplete
                              options={memoizedAvailableUsers}
                              anchorEl={anchorEl}
                              handleClose={handleClose}
                              handleSelect={(val) => handleSelect(val, 'users')}
                            />
                          </>
                        )
                      }
                    </div>
                    {TabPanels(tab, spaceItems, spaceUsers, deleteFromSpace, navigate)}
                  </>
                }
                <EntityActions
                  onDelete={handleDeleteSpace}
                  onEdit={toggleEditSpace}
                  className="absolute top-5 right-5"
                />
              </>
            )
        }
      </BaseContainer>
    </div>
  );
}

const TabPanels = (
  tab: number,
  spaceItems: OptionsDataType[],
  spaceUsers: OptionsDataType[],
  handleDelete: (id: string) => void,
  navigate: Function
): ReactNode => {


  const menuOptions = (id: string) => ([
    {
      children: 'Delete from space',
      id: 'delete',
      onClick: () => handleDelete(id)
    },
    {
      children: 'View page',
      id: 'view',
      onClick: () => {
        navigate(`/${tab === 0 ? 'items' : 'contacts'}/${id}`)
      }
    }
  ]);

  return (
    <div className="divide-y">
      {
        tab === 0
          ? (
            spaceItems.map((item) => (
              <div
                className="flex justify-between items-center"
                key={item._id}
              >
                <div className="flex justify-between items-center p-4 w-full">
                  <BaseAvatar
                    alt={`Mocked Item ${item.name}`}
                    size={40}
                    variant="square"
                    className="mr-2"
                  />
                  <div className="flex flex-col flex-1">
                    <span>{item.name}</span>
                    <span>{item.description}</span>
                  </div>
                  <span>{item.type}</span>
                </div>
                <BaseMenu options={menuOptions(item._id)}/>
              </div>
            ))
          )
          : (
            spaceUsers.map((user) => (
              <div
                className="flex justify-between items-center"
                key={user._id}
              >
                <div className="flex items-center p-4">
                  <BaseAvatar
                    alt={user.name}
                    size={40}
                    className="mr-2"
                  />
                  {user.name}
                </div>
                <BaseMenu options={menuOptions(user._id)}/>
              </div>
            ))
          )
      }
    </div>
  );
}