import {Link, useLocation} from "react-router-dom";
import React, {useCallback, useEffect, useState} from "react";
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import PublicIcon from '@mui/icons-material/Public';
import DevicesOtherIcon from '@mui/icons-material/DevicesOther';
import ImportContactsIcon from '@mui/icons-material/ImportContacts';
import MarkunreadMailboxOutlinedIcon from '@mui/icons-material/MarkunreadMailboxOutlined';
import BaseButton from "../BaseComponents/BaseButton";
import CloseIcon from '@mui/icons-material/Close';
import {useGetUserByIdQuery} from "../../generated/apollo-functions";
import {useLoading} from "../../contexts/LoadingContext";
import {NetworkStatus} from "@apollo/client";

const handleMenuToggle = () => {
  const menu = document.querySelector("#mobile-menu");
  menu!.classList.toggle('hidden');
};

const NavSideBar = () => {
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
            onClick={handleMenuToggle}
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
  const { setLoading } = useLoading();
  const userId = localStorage.getItem("userId")

  const {data, loading, networkStatus} = useGetUserByIdQuery({
    variables: {
      id: userId!
    },
    fetchPolicy: "cache-and-network"
  });

  const user = data?.getUserById!;

  useEffect(() => {
    setLoading(networkStatus === NetworkStatus.refetch || loading)
  }, [networkStatus, loading]);

  useEffect(() => {
    setActivePath(location.pathname);
  }, [location]);

  const navigationRoutes = user && [
    {
      path: "/",
      name: "Available",
      id: "available",
      icon: <SentimentSatisfiedAltIcon />,
      counter: 17 //Mocked
    },
    {
      path: "/spaces",
      name: "My spaces",
      id: "spaces",
      icon: <PublicIcon />,
      counter: user.spaces_count
    },
    {
      path: "/items",
      name: "My items",
      id: "items",
      icon: <DevicesOtherIcon />,
      counter: user.items_count
    },
    {
      path: "/contacts",
      name: "Contacts",
      id: "contacts",
      icon: <ImportContactsIcon />,
      counter: user.contacts_count
    },
    {
      path: "/contact_requests",
      name: "Contact requests",
      id: "requests",
      icon: <MarkunreadMailboxOutlinedIcon />,
      counter: user.contact_requests_count
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
        user && navigationRoutes.map(route => (
          <Link
            key={route.id}
            className={linkClasses(route.path)}
            to={route.path}
            onClick={handleMenuToggle}
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