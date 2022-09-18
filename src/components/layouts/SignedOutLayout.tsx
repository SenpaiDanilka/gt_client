import {Navigate, Outlet} from "react-router-dom";
import LanguageSelect from "../LanguageSelect";
import React from "react";

interface Props {
  cookies: boolean;
}

const SignedOutLayout: React.FC<Props> = (props) => {
  if (!!props.cookies) {
    return <Navigate to="/"/>;
  }

  return (
    <div className="flex items-center bg-blue-600 w-screen h-screen">
      <Outlet/>
      <div className="absolute bottom-4 right-4">
        <LanguageSelect/>
      </div>
    </div>
  )
}

export default SignedOutLayout;
