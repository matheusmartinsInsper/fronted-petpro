"use client";

import { createContext, useContext, useState, ReactNode, useEffect } from "react";

interface AppState {
  nameuser: string | null;
  email: string | null;
  typeuser: string | null;
  token: string | null
}

interface AppContextProps {
  state: AppState;
  setState: React.Dispatch<React.SetStateAction<AppState>>;
}

const AppContext = createContext<AppContextProps | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState<AppState>({
    nameuser: null,
    email: null,
    typeuser: null,
    token: null
  });

  const [isHydrated, setIsHydrated] = useState(false); // Para garantir que estamos no cliente

  useEffect(() => {
    setIsHydrated(true); // Marca que estamos no cliente
    const storedState = sessionStorage.getItem("appState");
    const storagesdataname = localStorage.getItem("nameuser")?.toString()||"";
    const storagesdatatypeuser = localStorage.getItem("typeuser")?.toString()||"";
    const storagesdataemail = localStorage.getItem("emailuser")?.toString()||"";
    const storagesdatatoken = localStorage.getItem("Authorization")?.toString()||"";
    const datastorage: AppState = {
        nameuser: storagesdataname,
        email: storagesdataemail,
        typeuser: storagesdatatypeuser,
        token: storagesdatatoken
    }
    if (storedState) {
      setState(datastorage);
    }
  }, []);

  useEffect(() => {
    if (isHydrated) {
      sessionStorage.setItem("appState", JSON.stringify(state));
    }
  }, [state, isHydrated]);

  if (!isHydrated) {
    // Enquanto não estiver hidratado, retorna um fallback (ou vazio)
    return null;
  }

  return (
    <AppContext.Provider value={{ state, setState }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};
