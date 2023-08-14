import React, { useContext, useEffect, useState } from 'react';
import { useAuth0, LogoutOptions } from '@auth0/auth0-react';
import { ContextProps, User } from '../types';

type UserContextType = {
  loginWithRedirect: () => void;
  logout: (options?: LogoutOptions) => void;
  myUser: User | null;
};

const UserContext = React.createContext<UserContextType>({} as UserContextType);

export const UserProvider: React.FC<ContextProps> = ({ children }) => {
  const { loginWithRedirect, logout, user } = useAuth0();

  const [myUser, setMyUser] = useState<User | null>(null);

  useEffect(() => {
    if (user) {
      setMyUser(user);
    }
  }, [user]);

  return (
    <UserContext.Provider value={{ loginWithRedirect, logout, myUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  return useContext(UserContext);
};
