import {useRoutes} from "react-router-dom";
import SignUp from "./views/SignUp";
import SignIn from "./views/SignIn";
import Home from "./views/Home";
import React, {useState} from "react";
import Items from "./views/Items";
import Spaces from "./views/Spaces";
import Contacts from "./views/Contacts";
import Item from "./views/Item";
import Space from "./views/Space";
import Cookie from "js-cookie";
import Contact from "./views/Contact";
import SignedInLayout from "./components/layouts/SignedInLayout";
import SignedOutLayout from "./components/layouts/SignedOutLayout";
import Settings from "./views/Settings";
import ItemNew from "./views/ItemNew";

export default function App() {
  /* TODO refactor when Sign In fixed */
  //const cookies = Cookie.get('fauna-session'));
  const [cookies, setCookies] = useState(true);
  const logout = () => {
    setCookies(false)
    //Cookie.remove('fauna-session');
  };

  const routes = useRoutes([
    {
      element: <SignedOutLayout cookies={cookies}/>,
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
        <SignedInLayout
          logout={logout}
          cookies={cookies}
        />
      ),
      children: [
        {
          path: "/", element: <Home/>
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
            {path: "new", element: <Space/>}
          ]
        },
        {
          path: "/contacts",
          children: [
            {index: true, element: <Contacts/>},
            {path: ":id", element: <Contact/>},
          ]
        },
        {
          path: "/settings",
          element: <Settings />
        }
      ]
    }
  ]);

  return (
    <>
      {routes}
    </>
  );
}