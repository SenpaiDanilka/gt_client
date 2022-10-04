import React, {ReactNode, useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import BaseContainer from "../components/BaseComponents/BaseContainer";
import {Space as SpaceClass} from "../models/SpacesModels";
import {Tab, Tabs} from "@mui/material";
import {useTranslation} from "react-i18next";
import SpacesService from "../services/SpacesService";
import BaseAvatar from "../components/BaseComponents/BaseAvatar";
import BaseMenu from "../components/BaseComponents/BaseMenu";
import PopperWithAutocomplete from "../components/PopperWithAutocomplete";
import AddButton from "../components/AddButton";

export default function Space() {
  const navigate = useNavigate();
  const {id} = useParams();
  const {t} = useTranslation('common');
  const [space, setSpace] = useState(new SpaceClass());
  const [tab, setTab] = useState(0);

  useEffect(() => {
    SpacesService.getItem(id!)
      .then((res) => setSpace(res));
  }, [id]);

  const handleSetTab = (event: React.SyntheticEvent, newValue: number) => {
    setTab(newValue);
  };

  const deleteFromSpace = (id: string) => {
    tab === 0
      ? console.log(`delete item ${id}`)
      : console.log(`delete user ${id}`)
  };

  const menuOptions = (id: string) => ([
    {
      children: 'Delete from space',
      id: 'delete',
      onClick: () => deleteFromSpace(id)
    },
    {
      children: 'View page',
      id: 'view',
      onClick: () => {
        navigate(`/${tab === 0 ? 'items' : 'contacts'}/${id}`)
      }
    }
  ]);

  const TabPanels = (value: number): ReactNode => {
    return (
      <div className="divide-y">
        {
          value === 0
            ? (
              [1, 2, 3].map((value) => (
                <div
                  className="flex justify-between items-center"
                  key={value}
                >
                  <div className="flex justify-between items-center p-4 w-full">
                    <BaseAvatar
                      alt={`Mocked Item ${value}`}
                      size={40}
                      variant="square"
                      className="mr-2"
                    />
                    <div className="flex flex-col flex-1">
                      <span>{`Item name ${value}`}</span>
                      <span>{`Item description: ${value}`}</span>
                    </div>
                    <span>{`Item type: type ${value}`}</span>
                  </div>
                  <BaseMenu options={menuOptions(String(value))}/>
                </div>
              ))
            )
            : (
              [1, 2, 3].map((value) => (
                <div
                  className="flex justify-between items-center"
                  key={value}
                >
                  <div className="flex items-center p-4">
                    <BaseAvatar
                      alt={`Mocked User ${value}`}
                      size={40}
                      className="mr-2"
                    />
                    {`Mocked User ${value}`}
                  </div>
                  <BaseMenu options={menuOptions(String(value))}/>
                </div>
              ))
            )
        }
      </div>
    );
  }

  const handleAddItemClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(e.currentTarget);
  };

  const handleAddUserClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(e.currentTarget);
  };



  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

  const handleClose = () => {
    setAnchorEl(null);
  };


  return (
    <div className="p-4">
      <p className="text-3xl font-bold mb-4">{`Space ${id}`}</p>
      <BaseContainer className="p-4">
        <div className="flex flex-col space-y-4">
          <span>{space.name}</span>
          <span>{space.description}</span>
        </div>
        <div className="flex justify-center items-center">
          {
            tab === 0 && (
              <>
                <AddButton
                  onClick={handleAddItemClick}
                  className="mr-2 w-7 h-7"
                />
                <PopperWithAutocomplete
                  options={availableItems}
                  anchorEl={anchorEl}
                  handleClose={handleClose}
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
                  onClick={handleAddUserClick}
                  className="ml-2 w-7 h-7"
                />
                <PopperWithAutocomplete
                  options={availableUsers}
                  anchorEl={anchorEl}
                  handleClose={handleClose}
                />
              </>
            )
          }
        </div>
        {TabPanels(tab)}
      </BaseContainer>
    </div>
  );
}

const availableUsers = [
  {
    name: 'TestUser1',
  },
  {
    name: 'TestUser2',
  },
  {
    name: 'TestUser3',
  },
  {
    name: 'TestUser4',
  },
  {
    name: 'TestUser5',
  },
  {
    name: 'TestUser6',
  },
  {
    name: 'TestUser7',
  },
  {
    name: 'TestUser8',
  },
  {
    name: 'TestUser9',
  },
  {
    name: 'TestUser10',
  },
  {
    name: 'TestUser11',
  },
  {
    name: 'TestUser12',
  },
  {
    name: 'TestUser13',
  },
  {
    name: 'TestUser14',
  },
  {
    name: 'TestUser15',
  },
  {
    name: 'TestUser16',
  },
  {
    name: 'TestUser17',
  },
  {
    name: 'TestUser18',
  },
  {
    name: 'TestUser19',
  },
  {
    name: 'TestUser20',
  },
  {
    name: 'TestUser21',
  },
  {
    name: 'TestUser22',
  }
];

const availableItems = [
  {
    name: 'TestItem1',
  },
  {
    name: 'TestItem2',
  },
  {
    name: 'TestItem3',
  },
  {
    name: 'TestItem4',
  },
  {
    name: 'TestItem5',
  },
  {
    name: 'TestItem6',
  },
  {
    name: 'TestItem7',
  },
  {
    name: 'TestItem8',
  },
  {
    name: 'TestItem9',
  },
  {
    name: 'TestItem10',
  },
  {
    name: 'TestItem11',
  },
  {
    name: 'TestItem12',
  },
  {
    name: 'TestItem13',
  },
  {
    name: 'TestItem14',
  },
  {
    name: 'TestItem15',
  },
  {
    name: 'TestItem16',
  },
  {
    name: 'TestItem17',
  },
  {
    name: 'TestItem18',
  },
  {
    name: 'TestItem19',
  },
  {
    name: 'TestItem20',
  },
  {
    name: 'TestItem21',
  },
  {
    name: 'TestItem22',
  }
];