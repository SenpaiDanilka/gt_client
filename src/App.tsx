import {useRoutes} from "react-router-dom";
import SignUp from "./views/SignUp";
import SignIn from "./views/SignIn";
import Home from "./views/Home";
import Items from "./views/Items";
import Spaces from "./views/Spaces";
import Contacts from "./views/Contacts";
import ContactRequests from "./views/ContactRequests";
import Item from "./views/Item";
import Space from "./views/Space";
import SpaceNew from "./views/SpaceNew";
import Cookie from "js-cookie";
import SignedInLayout from "./components/layouts/SignedInLayout";
import SignedOutLayout from "./components/layouts/SignedOutLayout";
import Settings from "./views/Settings";
import ItemNew from "./views/ItemNew";
import React, {useEffect} from "react";
import {useLoading} from "./contexts/LoadingContext";
import {BaseLoader} from "./components/BaseComponents/BaseLoader";
import {Alert, Snackbar} from "@mui/material";
import {themeCheck} from "./utils/theme";

export const AuthContext = React.createContext(false);

export default function App() {
  useEffect(() => {
    themeCheck();
  }, []);

  const cookies = !!Cookie.get('fauna-session');
  const routes = useRoutes([
    {
      element: <SignedOutLayout/>,
      children: [
        {
          path: "/sign_up", element: <SignUp/>
        },
        {
          path: "/sign_in", element: <SignIn/>
        }
      ]
    },
    {
      element: (
        <SignedInLayout/>
      ),
      children: [
        {
          path: "/", 
          children: [
            {index: true, element: <Home/>},
            {path: ":id", element: <Home/>},
          ]
        },
        {
          path: "/items",
          children: [
            {index: true, element: <Items/>},
            {path: ":id", element: <Item/>},
            {path: "new", element: <ItemNew/>}
          ]
        },
        {
          path: "/spaces",
          children: [
            {index: true, element: <Spaces/>},
            {path: ":id", element: <Space/>},
            {path: "new", element: <SpaceNew/>}
          ]
        },
        {
          path: "/contacts",
          element: <Contacts/>
        },
        {
          path: "/contact_requests",
          element: <ContactRequests/>
        },
        {
          path: "/settings",
          element: <Settings/>
        }
      ]
    }
  ]);

  const { loading, alertData, setAlertData } = useLoading();

  const handleClose = () => {
    setAlertData({
      ...alertData,
      isOpen: false
    })
  };

  return (
    <>
      <AuthContext.Provider value={cookies}>
        {routes}
      </AuthContext.Provider>
      {
        loading && <BaseLoader />
      }
      <Snackbar
        open={alertData.isOpen}
        autoHideDuration={3000}
        onClose={handleClose}
      >
        <Alert
          severity={alertData.type}
          onClose={handleClose}
        >
          { alertData.text }
        </Alert>
      </Snackbar>
    </>
  );
}