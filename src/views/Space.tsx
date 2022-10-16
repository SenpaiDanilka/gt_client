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
import EntityActions from "../components/EntityActions";
import EditSpaceForm from "../components/spaces/EditSpaceForm";
import {FormDataType} from "../models/CommonModels";
import SubmitActionModal from "../components/SubmitActionModal";
import {
  useCreateAvailableItemMutation,
  useCreateSpaceContactLinkMutation, useDeleteAvailableItemMutation, useDeleteSpaceContactLinkMutation,
  useDeleteSpaceMutation,
  useFindSpaceByIdQuery,
  useFindUserContactsByIdQuery, useFindUserItemsByIdQuery, useGetModelItemsQuery,
  useUpdateSpaceMutation
} from "../generated/apollo-functions";
import {AvailabilityModel} from "../generated/types";

type ApproveModalDataType = {
  isOpen: boolean;
  content: ReactNode;
  onSubmit: () => void;
}

export default function Space() {
  const {id} = useParams();
  const userId = localStorage.getItem('userId')
  const navigate = useNavigate();
  const {t} = useTranslation('common');
  const [tab, setTab] = useState(0);
  const [approveModalData, setApproveModalData] = useState<ApproveModalDataType | null>(null);
  const [availableItems, setAvailableItems] = useState<OptionsDataType[]>([]);
  const [availableUsers, setAvailableUsers] = useState<OptionsDataType[]>([]);
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
  const [spaceItems, setSpaceItems] = useState<OptionsDataType[]>([]);
  const [spaceUsers, setSpaceUsers] = useState<OptionsDataType[]>([]);
  const {setLoading, setAlertData} = useLoading();
  const [isEdit, setIsEdit] = useState(false);

  const {data: findSpaceByIdData, loading: spaceLoading, error: getSpaceError} = useFindSpaceByIdQuery({
    variables: {
      id: id!
    }
  });

  useEffect(() => {
    if (findSpaceByIdData?.findSpaceByID?.contacts.data.length) {
      setSpaceUsers(findSpaceByIdData?.findSpaceByID.contacts.data.map((contactLink) => ({
        _id: contactLink!._id,
        name: contactLink!.contact.user.name,
        optionId: contactLink!.contact.user._id
      })))
    }
  }, [findSpaceByIdData])

  const {data: userContactsData, loading: userContactsLoading} = useFindUserContactsByIdQuery({
    variables: {
      id: userId!
    }
  });

  useEffect(() => {
    if (userContactsData?.findUserByID?.contacts.data.length) {
      setAvailableUsers(userContactsData?.findUserByID.contacts.data.map((contact) => ({
        _id: contact!._id,
        name: contact!.user.name,
        optionId: contact!.user._id
      })))
    }
  }, [userContactsData])

  const {data: userItemsData, loading: getUserItemsLoading} = useFindUserItemsByIdQuery({
    variables: {
      id: userId!
    }
  })

  useEffect(() => {
    if (userItemsData?.findUserByID?.items.data.length) {
      setAvailableItems(userItemsData.findUserByID.items.data as OptionsDataType[])
    }
  }, [userItemsData])

  const {data: spaceItemsData, loading: getSpaceItemsLoading} = useGetModelItemsQuery({
    variables: {
      model: AvailabilityModel.Space,
      model_id: id!
    }
  })

  useEffect(() => {
    if (spaceItemsData?.getModelItems?.length) {
      setSpaceItems(spaceItemsData?.getModelItems.map((availableItem) => ({
        _id: availableItem._id,
        name: availableItem.item.name,
        description: availableItem.item.description,
        type: availableItem.item.type,
        optionId: availableItem.item._id
      } as OptionsDataType)));
    }
  }, [spaceItemsData])

  const [deleteSpace, {loading: deleteLoading, error: deleteSpaceError}] = useDeleteSpaceMutation();
  const [updateSpace, {loading: editLoading, error: editError}] = useUpdateSpaceMutation({
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
    setApproveModalData({
      isOpen: true,
      content: (
        <p className="mb-4">Delete space ID: {
          <span className="font-bold">{id}</span>
        }?</p>
      ),
      onSubmit: () => {
        deleteSpace({
          variables: {
            id: id!
          }
        }).then(() => {
          setApproveModalData(null);
          setAlertData({
            isOpen: true,
            text: 'Item has been deleted',
            type: 'success'
          });
          navigate('/spaces');
        })
      }
    });
  };

  const handleEditSpace = async (formData: FormDataType) => {
    await updateSpace({
      variables: {
        id: id!,
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
          model: AvailabilityModel.Space,
          model_id: id!,
          item_id: val!._id
        }
      }).then((res) => {
        const availableItem = res.data?.createAvailableItem;
        !!availableItem && setSpaceItems(current => {
          return [...current, {
            _id: availableItem._id,
            name: availableItem.item.name,
            description: availableItem.item.description,
            type: availableItem.item.type,
            optionId: availableItem.item._id
          } as OptionsDataType];
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
      }).then((res) => {
        const spaceContactLink = res.data?.createSpaceContactLink;
        !!spaceContactLink && setSpaceUsers(current => {
          return [...current, {
            _id: spaceContactLink._id,
            name: spaceContactLink.contact.user.name,
            optionId: spaceContactLink.contact.user._id
          }];
        });
      })
    }
  }

  const deleteFromSpace = (id: string) => {
    setApproveModalData({
      isOpen: true,
      content: (
        <p className="mb-4">
          {
            `Delete from this space ${tab === 0 ? 'item' : 'user'} ID: `
          }
          <span className="font-bold">{id}</span>
          ?
        </p>
      ),
      onSubmit: () => {
        tab === 0 ? deleteItemFromSpace({
          variables: {
            id: id
          }
        }).then(_ => {
          setSpaceItems((current) =>
            current.filter((item) => item._id !== id));
          setApproveModalData(null);
          setAlertData({
            isOpen: true,
            text: 'Has been deleted',
            type: 'success'
          });
        }) : deleteContactFromSpace({
          variables: {
            id: id
          }
        }).then(_ => {
          setSpaceUsers((current) =>
            current.filter((item) => item._id !== id));
          setApproveModalData(null);
          setAlertData({
            isOpen: true,
            text: 'Has been deleted',
            type: 'success'
          });
        })
      }
    });
  };

  const [createSpaceContactLink] = useCreateSpaceContactLinkMutation();

  const [createAvailableItem] = useCreateAvailableItemMutation();

  const [deleteItemFromSpace] = useDeleteAvailableItemMutation();

  const [deleteContactFromSpace] = useDeleteSpaceContactLinkMutation();

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
                  name: findSpaceByIdData!.findSpaceByID!.name,
                  description: findSpaceByIdData!.findSpaceByID!.description || ''
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
        {
          !!approveModalData && (
            <SubmitActionModal
              open={approveModalData.isOpen}
              onSubmit={approveModalData.onSubmit}
              onCancel={() => setApproveModalData(null)}
            >
              { approveModalData.content }
            </SubmitActionModal>
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
                key={item!._id}
              >
                <div className="flex p-4 w-full">
                  <BaseAvatar
                    alt={item!.name}
                    size={40}
                    variant="square"
                    className="mr-4"
                  />
                  <div className="flex flex-col flex-1">
                    <span className="mb-2 font-semibold leading-4">{item!.name}</span>
                    <span className="line-clamp-3">{item!.description}</span>
                  </div>
                </div>
                <BaseMenu options={menuOptions(item!._id)}/>
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