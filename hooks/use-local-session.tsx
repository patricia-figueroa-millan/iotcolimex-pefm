import { createContext, ReactNode, useState } from "react";

type LocalSessionContextType = {
  isLoggedIn: boolean;
  login: () => void;
  logout: () => void;
};

const LocalSessionContext = createContext<LocalSessionContextType>(
  {} as LocalSessionContextType
);

const LocalSessionContextProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = () => setIsLoggedIn(true);
  const logout = () => setIsLoggedIn(false);

  return (
    <LocalSessionContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </LocalSessionContext.Provider>
  );
};

export { LocalSessionContextProvider, LocalSessionContext };
