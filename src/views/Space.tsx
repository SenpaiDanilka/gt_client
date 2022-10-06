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
import {useQuery, useMutation} from '@apollo/client';
import EntityActions from "../components/EntityActions";
import EditSpaceForm from "../components/spaces/EditSpaceForm";
import {FormDataType} from "../models/CommonModels";

const mockedSpaceItems = [
  {
    name: 'Item name 1',
    description: 'Item description 1',
    type: 'OTHERS',
    id: 1
  },
  {
    name: 'Item name 2',
    description: 'Item description 2',
    type: 'ELECTRONICS',
    id: 2
  },
  {
    name: 'Item name 3',
    description: 'Item description 3',
    type: 'VEHICLE',
    id: 3
  }
];

const mockedSpaceUsers = [
  {
    name: 'User name 1',
    id: 1
  },
  {
    name: 'User name 2',
    id: 2
  },
  {
    name: 'User name 3',
    id: 3
  }
];

export default function Space() {
  const {id} = useParams();
  const navigate = useNavigate();
  const {t} = useTranslation('common');
  const [tab, setTab] = useState(0);
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
    setLoading(spaceLoading || deleteLoading || editLoading);
    return () => setLoading(false);
  }, [spaceLoading, deleteLoading, editLoading]);

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
        .findIndex(spaceItem => spaceItem.id === item.id) === -1);
  }, [spaceItems]);

  const memoizedAvailableUsers = useMemo(() => {
    return availableUsers
      .filter(item => spaceUsers
        .findIndex(spaceUser => spaceUser.id === item.id) === -1);
  }, [spaceUsers]);

  const handleSelect = (val: OptionsDataType | null, key: string) => {
    if (key === 'items') {
      setSpaceItems(current => {
        return [...current, val!];
      });
    }
    if (key === 'users') {
      setSpaceUsers(current => {
        return [...current, val!];
      });
    }
  }

  const deleteFromSpace = (id: number) => {
    tab === 0
      ? setSpaceItems((current) =>
        current.filter((item) => item.id !== id))
      : setSpaceUsers((current) =>
        current.filter((item) => item.id !== id))
    setAlertData({
      isOpen: true,
      text: 'Has been deleted',
      type: 'success'
    });
  };

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
  handleDelete: (id: number) => void,
  navigate: Function
): ReactNode => {

  const menuOptions = (id: number) => ([
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
                key={item.id}
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
                <BaseMenu options={menuOptions(item.id)}/>
              </div>
            ))
          )
          : (
            spaceUsers.map((user) => (
              <div
                className="flex justify-between items-center"
                key={user.id}
              >
                <div className="flex items-center p-4">
                  <BaseAvatar
                    alt={user.name}
                    size={40}
                    className="mr-2"
                  />
                  {user.name}
                </div>
                <BaseMenu options={menuOptions(user.id)}/>
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
    id: 1
  },
  {
    name: 'TestUser2',
    id: 2
  },
  {
    name: 'TestUser3',
    id: 3
  },
  {
    name: 'TestUser4',
    id: 4
  },
  {
    name: 'TestUser5',
    id: 5
  },
  {
    name: 'TestUser6',
    id: 6
  },
  {
    name: 'TestUser7',
    id: 7
  },
  {
    name: 'TestUser8',
    id: 8
  },
  {
    name: 'TestUser9',
    id: 9
  },
  {
    name: 'TestUser10',
    id: 10
  },
  {
    name: 'TestUser11',
    id: 11
  }
];

const availableItems = [
  {
    name: 'TestItem1',
    description: 'some desc',
    type: 'OTHERS',
    id: 1
  },
  {
    name: 'TestItem2',
    description: 'some desc',
    type: 'OTHERS',
    id: 2
  },
  {
    name: 'TestItem3',
    description: 'some desc',
    type: 'OTHERS',
    id: 3
  },
  {
    name: 'TestItem4',
    description: 'some desc',
    type: 'OTHERS',
    id: 4
  },
  {
    name: 'TestItem5',
    description: 'some desc',
    type: 'OTHERS',
    id: 4
  },
  {
    name: 'TestItem6',
    description: 'some desc',
    type: 'OTHERS',
    id: 5
  },
  {
    name: 'TestItem7',
    description: 'some desc',
    type: 'OTHERS',
    id: 6
  },
  {
    name: 'TestItem8',
    description: 'some desc',
    type: 'OTHERS',
    id: 7
  },
  {
    name: 'TestItem9',
    description: 'some desc',
    type: 'OTHERS',
    id: 8
  },
  {
    name: 'TestItem10',
    description: 'some desc',
    type: 'OTHERS',
    id: 9
  },
  {
    name: 'TestItem11',
    description: 'some desc',
    type: 'OTHERS',
    id: 10
  },
  {
    name: 'TestItem12',
    description: 'some desc',
    type: 'OTHERS',
    id: 11
  }
];