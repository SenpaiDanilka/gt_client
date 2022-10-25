import {Link, useLocation} from "react-router-dom";
import React, {FC, useCallback, useEffect, useState} from "react";
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import PublicIcon from '@mui/icons-material/Public';
import DevicesOtherIcon from '@mui/icons-material/DevicesOther';
import ImportContactsIcon from '@mui/icons-material/ImportContacts';
import BaseButton from "../BaseComponents/BaseButton";
import CloseIcon from '@mui/icons-material/Close';

interface Props {
  onClose: () => void;
}

const NavSideBar: FC<Props> = ({
  onClose
}) => {
  return (
    <div id="mobile-menu" className="bg-white dark:bg-dark-bg min-w-[250px] md:min-w-[220px] max-w-[250px] md:max-w-[220px] py-4 px-5 h-full border-r border-br-stroke dark:border-br-dark hidden md:flex flex-col">
      <div className="flex items-center justify-center mb-3 md:mb-12">
        <img className="mr-2.5" src="/logo.png" alt="logo" />
        <span className="font-semibold text-mgb text-lg dark:text-gb">
          Guest Trip
        </span>
        <div className="md:hidden flex-1 flex justify-end">
          <BaseButton
            buttonType="icon"
            onClick={onClose}
            className="text-gb hover:text-blue dark:hover:text-white"
          >
            <CloseIcon />
          </BaseButton>
        </div>
      </div>
      <NavBar />
    </div>
  );
};

export default NavSideBar;

const NavBar = () => {
  const location = useLocation();
  const [activePath, setActivePath] = useState('/');

  useEffect(() => {
    setActivePath(location.pathname);
  }, [location]);

  const navigationRoutes = [
    {
      path: "/",
      name: "Available",
      id: "available",
      icon: <SentimentSatisfiedAltIcon />,
      counter: 17
    },
    {
      path: "/spaces",
      name: "My spaces",
      id: "spaces",
      icon: <PublicIcon />,
      counter: 3
    },
    {
      path: "/items",
      name: "My items",
      id: "items",
      icon: <DevicesOtherIcon />,
      counter: 9
    },
    {
      path: "/contacts",
      name: "Contacts",
      id: "contacts",
      icon: <ImportContactsIcon />,
      counter: 126
    },
  ];

  const linkClasses = useCallback((path: string) => {
    const baseStyles = 'rounded-lg px-6 py-2.5 cursor-pointer flex h-10 flex items-center justify-center';
    const activeStyles = 'bg-blue text-white';
    const plainStyles = 'text-gb';

    if (path === '/') {
      return path === activePath
        ? baseStyles.concat(' ', activeStyles)
        : baseStyles.concat(' ', plainStyles);
    }

    if (activePath.includes(path)) {
      return baseStyles.concat(' ', activeStyles);
    }

    return baseStyles.concat(' ', plainStyles);
  }, [activePath]);

  return (
    <div
      className="flex flex-col text-base"
    >
      {
        navigationRoutes.map(route => (
          <Link
            key={route.id}
            className={linkClasses(route.path)}
            to={route.path}
          >
            <div className="mr-3 [&>svg]:w-5 [&>*]:h-5">
              { route.icon }
            </div>
            <span>{ route.name }</span>
            <span className="flex-1 text-right">({ route.counter })</span>
          </Link>
        ))
      }
    </div>
  );
};