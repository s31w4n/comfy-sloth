import React, { useContext, useEffect, useState } from 'react';
import { useAuth0, LogoutOptions } from '@auth0/auth0-react';

export type User = {
  name?: string;
  given_name?: string;
  family_name?: string;
  middle_name?: string;
  nickname?: string;
  preferred_username?: string;
  profile?: string;
  picture?: string;
  website?: string;
  email?: string;
  email_verified?: boolean;
  gender?: string;
  birthdate?: string;
  zoneinfo?: string;
  locale?: string;
  phone_number?: string;
  phone_number_verified?: boolean;
  address?: string;
  updated_at?: string;
  sub?: string;
  [key: string]: any;
};

export type UserContextType = {
  loginWithRedirect: () => void;
  logout: (options?: LogoutOptions) => void;
  myUser: User | null;
};

interface ContextProps {
  children: React.ReactNode;
}

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

// make sure use
export const useUserContext = () => {
  return useContext(UserContext);
};
