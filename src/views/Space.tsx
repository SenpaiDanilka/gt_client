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
import {DELETE_SPACE, FIND_SPACE_BY_ID, UPDATE_SPACE} from "../services/SpacesService";
import {CREATE_AVAILABLE_ITEM, GET_USER_ITEMS} from "../services/ItemsService";
import {useQuery, useMutation, NetworkStatus} from '@apollo/client';
import EntityActions from "../components/EntityActions";
import EditSpaceForm from "../components/spaces/EditSpaceForm";
import {FormDataType} from "../models/CommonModels";
import { AvailabilityModel } from "../models/ItemsModels";

const mockedSpaceItems = [
  {
    name: 'Item name 1',
    description: 'Item description 1',
    type: 'OTHERS',
    _id: '1'
  },
  {
    name: 'Item name 2',
    description: 'Item description 2',
    type: 'ELECTRONICS',
    _id: '2'
  },
  {
    name: 'Item name 3',
    description: 'Item description 3',
    type: 'VEHICLE',
    _id: '3'
  }
];

const mockedSpaceUsers = [
  {
    name: 'User name 1',
    _id: '1'
  },
  {
    name: 'User name 2',
    _id: '2'
  },
  {
    name: 'User name 3',
    _id: '3'
  }
];

export default function Space() {
  const {id} = useParams();
  const userId = localStorage.getItem('userId')
  const navigate = useNavigate();
  const {t} = useTranslation('common');
  const [tab, setTab] = useState(0);
  const [availableItems, setAvailableItems] = useState<OptionsDataType[]>([]);
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
  const [spaceItems, setSpaceItems] = useState<OptionsDataType[]>(mockedSpaceItems);
  const [spaceUsers, setSpaceUsers] = useState<OptionsDataType[]>(mockedSpaceUsers);
  const {setLoading, setAlertData} = useLoading();
  const [isEdit, setIsEdit] = useState(false);

  const {data, loading: spaceLoading, error: getSpaceError} = useQuery(FIND_SPACE_BY_ID, {
    variables: {
      id: id
    }
  });
  const {data: userItemsData, loading: getUserItemsLoading, networkStatus} = useQuery(GET_USER_ITEMS, {
    variables: {
      id: userId
    },
    notifyOnNetworkStatusChange: true
  })

  useEffect(() => {
    if (userItemsData?.findUserByID.items.data.length) {
      setAvailableItems(userItemsData.findUserByID.items.data)
    }
  }, [userItemsData])

  // useEffect(() => {
  //   if (spaceItemsData?.findUserByID.items.data.length) {
  //     setAvailableItems(userItemsData.findUserByID.items.data)
  //   }
  // }, [spaceItemsData])

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
    setLoading(spaceLoading || deleteLoading || editLoading || networkStatus === NetworkStatus.refetch || getUserItemsLoading);
    return () => setLoading(false);
  }, [spaceLoading, deleteLoading, editLoading, networkStatus, getUserItemsLoading]);

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
        .findIndex(spaceItem => spaceItem._id === item._id) === -1);
  }, [spaceItems, availableItems]);

  const memoizedAvailableUsers = useMemo(() => {
    return availableUsers
      .filter(item => spaceUsers
        .findIndex(spaceUser => spaceUser._id === item._id) === -1);
  }, [spaceUsers]);

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
          return [...current, res.data.createAvailableItem.item!];
        });
      })
    }
    if (key === 'users') {
      setSpaceUsers(current => {
        return [...current, val!];
      });
    }
  }

  const deleteFromSpace = (id: string) => {
    tab === 0
      ? setSpaceItems((current) =>
        current.filter((item) => item._id !== id))
      : setSpaceUsers((current) =>
        current.filter((item) => item._id !== id))
    setAlertData({
      isOpen: true,
      text: 'Has been deleted',
      type: 'success'
    });
  };

  const [createAvailableItem] = useMutation(CREATE_AVAILABLE_ITEM);

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
                  name: data.findSpaceByID.name,
                  description: data.findSpaceByID.description
                }}
              />
            ) : (
              <>
                {
                  data && data.findSpaceByID &&
                  <>
                    <div className="flex flex-col space-y-4 mb-2">
                      <span>{data.findSpaceByID.name}</span>
                      <span>{data.findSpaceByID.description}</span>
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

const availableUsers = [
  {
    name: 'TestUser1',
    _id: '1'
  },
  {
    name: 'TestUser2',
    _id: '2'
  },
  {
    name: 'TestUser3',
    _id: '3'
  },
  {
    name: 'TestUser4',
    _id: '4'
  },
  {
    name: 'TestUser5',
    _id: '5'
  },
  {
    name: 'TestUser6',
    _id: '6'
  },
  {
    name: 'TestUser7',
    _id: '7'
  },
  {
    name: 'TestUser8',
    _id: '8'
  },
  {
    name: 'TestUser9',
    _id: '9'
  },
  {
    name: 'TestUser10',
    _id: '10'
  },
  {
    name: 'TestUser11',
    _id: '11'
  }
];