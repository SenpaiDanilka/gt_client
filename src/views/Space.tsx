import React, {useEffect, useMemo, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {useTranslation} from "react-i18next";
import BaseAvatar from "../components/BaseComponents/BaseAvatar";
import PopperWithAutocomplete, {OptionsDataType} from "../components/PopperWithAutocomplete";
import AddButton from "../components/AddButton";
import {useLoading} from "../contexts/LoadingContext";
import {CREATE_SPACE_CONTACT_LINK, DELETE_SPACE_CONTACT_LINK} from "../services/SpacesService";
import {CREATE_AVAILABLE_ITEM, GET_USER_ITEMS, GET_SPACE_ITEMS, DELETE_ITEM_FROM_SPACE} from "../services/ItemsService";
import {GET_CONTACTS_BY_USER_ID} from '../services/UsersService'
import {useQuery, useMutation} from '@apollo/client';
import EntityActions from "../components/EntityActions";
import EditSpaceForm from "../components/spaces/EditSpaceForm";
import {FormDataType} from "../models/CommonModels";
import SubmitActionModal from "../components/SubmitActionModal";
import {
  useDeleteSpaceMutation,
  useFindSpaceByIdQuery,
  useGetModelItemsQuery,
  useUpdateSpaceMutation
} from "../generated/apollo-functions";
import {AvailabilityModel, Item} from "../generated/types";
import ItemsTable from "../components/items/ItemsTable";
import Tooltip from "@mui/material/Tooltip";
import BaseButton from "../components/BaseComponents/BaseButton";
import CloseIcon from "@mui/icons-material/Close";

export default function Space() {
  const {id} = useParams();
  const userId = localStorage.getItem('userId')
  const navigate = useNavigate();
  const {t} = useTranslation('common');
  const [popperType, setPopperType] = useState('item');
  const [isApproveModalOpen, setIsApproveModalOpen] = useState(false);
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
      setSpaceUsers(findSpaceByIdData?.findSpaceByID.contacts.data.map((contactLink: any) => {
        const contactUser = userId === contactLink.contact.user_one._id ? contactLink.contact.user_two : contactLink.contact.user_one
        return {
          _id: contactLink._id,
          name: contactUser.name,
          optionId: contactUser._id
        }
      }))
    }
  }, [findSpaceByIdData])

  const {data: userContactsData, loading: userContactsLoading} = useQuery(GET_CONTACTS_BY_USER_ID, {
    variables: {
      user_id: userId
    }
  });

  useEffect(() => {
    if (userContactsData?.getContactsByUserId.length) {
      setAvailableUsers(userContactsData?.getContactsByUserId.map((contact: any) => {
        const contactUser = userId === contact.user_one._id ? contact.user_two : contact.user_one
        return {
          _id: contact._id,
          name: contactUser.name,
          optionId: contactUser._id
        }
      }))
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

  const {data: spaceItemsData, loading: getSpaceItemsLoading} = useGetModelItemsQuery({
    variables: {
      model: AvailabilityModel.Space,
      model_id: id!
    }
  });

  useEffect(() => {
    if (spaceItemsData?.getModelItems?.length) {
      setSpaceItems(spaceItemsData.getModelItems.map((availableItem) => ({
        _id: availableItem._id,
        name: availableItem.item.name,
        description: availableItem.item.description,
        type: availableItem.item.type,
        optionId: availableItem.item!._id
      })))
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
    deleteSpace({
      variables: {
        id: id!
      }
    }).then(() => {
      setIsApproveModalOpen(false);
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
        id: id!,
        data: {
          name: formData.name.value,
          description: formData.description.value
        }
      }
    });
  };

  const handleAddClick = (e: React.MouseEvent<HTMLButtonElement>, key: string) => {
    setPopperType(key);
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
          const contact = res.data.createSpaceContactLink.contact
          const contactUser = userId === contact.user_one._id ? contact.user_two : contact.user_one
          return [...current, {
            _id: res.data.createSpaceContactLink._id,
            name: contactUser.name,
            optionId: contactUser._id
          }];
        });
      })
    }
  }

  const handleDeleteItemFromSpace = (id: string) => {
    deleteItemFromSpace({
      variables: {
        id: id
      }
    }).then(_ => {
      setSpaceItems((current) =>
        current.filter((item) => item._id !== id));
      setAlertData({
        isOpen: true,
        text: 'Has been deleted',
        type: 'success'
      });
    })

  };
  const handleDeleteContactFromSpace = (id: string) => {
    deleteContactFromSpace({
      variables: {
        id: id
      }
    }).then(_ => {
      setSpaceUsers((current) =>
        current.filter((item) => item._id !== id));
      setAlertData({
        isOpen: true,
        text: 'Has been deleted',
        type: 'success'
      });
    })

  };

  const [createSpaceContactLink] = useMutation(CREATE_SPACE_CONTACT_LINK);

  const [createAvailableItem] = useMutation(CREATE_AVAILABLE_ITEM);

  const [deleteItemFromSpace] = useMutation(DELETE_ITEM_FROM_SPACE);

  const [deleteContactFromSpace] = useMutation(DELETE_SPACE_CONTACT_LINK);

  return (
    <div className="p-5 md:p-10 mx-auto my-4 relative">
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
          ) : findSpaceByIdData && findSpaceByIdData.findSpaceByID && (
          <div className="text-base">
            <p className="text-xl text-mgb dark:text-white mb-2">
              {findSpaceByIdData.findSpaceByID.name}
            </p>
            <p className="text-gb">{findSpaceByIdData.findSpaceByID.description}</p>
            <div className="my-10">
              <ItemsTable
                items={spaceItems.map(item => {
                  const obj = {} as Partial<Item>;
                  return {
                    ...obj,
                    ...item
                  } as Item
                })}
                onDelete={handleDeleteItemFromSpace}
              />
              <>
                <AddButton
                  text="Add item"
                  onClick={(e) => handleAddClick(e, 'items')}
                  className="mt-2"
                />
              </>
            </div>
            <p className="text-mgb dark:text-white font-semibold mb-2.5">Users</p>
            {
              spaceUsers.map((contact) => (
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
                  <Tooltip title={t('delete', {ns: 'common'})}>
                    <BaseButton
                      buttonType="icon"
                      size="small"
                      className="text-gb hover:text-blue dark:hover:text-white"
                      onClick={() => handleDeleteContactFromSpace(contact._id)}
                    >
                      <CloseIcon className="text-3xl md:text-xl"/>
                    </BaseButton>
                  </Tooltip>
                </div>
              ))
            }
            <AddButton
              key="user"
              text="Add user"
              onClick={(e) => handleAddClick(e, 'users')}
              className="mt-2"
            />
            <PopperWithAutocomplete
              options={
                popperType === 'items'
                  ? memoizedAvailableItems
                  : memoizedAvailableUsers
              }
              anchorEl={anchorEl}
              handleClose={handleClose}
              handleSelect={(val) => handleSelect(val, popperType)}
            />
            <EntityActions
              onDelete={handleDeleteSpace}
              onEdit={toggleEditSpace}
              className="absolute top-5 right-5"
            />
            <SubmitActionModal
              open={isApproveModalOpen}
              onSubmit={deleteSpace}
              onCancel={() => setIsApproveModalOpen(false)}
            >
              <p className="mb-4">Delete space ID: {
                <span className="font-bold">{id}</span>
              }?</p>
            </SubmitActionModal>
          </div>
        )
      }
    </div>
  );
}