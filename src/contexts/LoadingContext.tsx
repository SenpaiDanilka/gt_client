import React, {createContext, Dispatch, SetStateAction, useContext, useState} from "react";

type AlertType = "success" | "info" | "warning" | "error"

type AlertDataType = {
  isOpen: boolean;
  type: AlertType;
  text: string;
}

interface ContextProps {
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
  alertData: AlertDataType;
  setAlertData: Dispatch<SetStateAction<AlertDataType>>;
}

interface LoadingProviderProps {
  children: JSX.Element
}

const initialAlertData = {
  isOpen: false,
  type: "info" as AlertType,
  text: ""
};

const LoadingContext = createContext<ContextProps>({
  loading: false,
  setLoading: () => null,
  alertData: initialAlertData,
  setAlertData: () => null
});

export function LoadingProvider({children}: LoadingProviderProps) {
  const [loading, setLoading] = useState(false);
  const [alertData, setAlertData] = useState<AlertDataType>(initialAlertData);
  const value = { loading, setLoading, alertData, setAlertData };
  return (
    <LoadingContext.Provider value={value}> {children} </LoadingContext.Provider>
  );
}

export function useLoading() {
  return useContext(LoadingContext);
}