import React, { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

interface Props {
  children: ReactNode;
}

const PrivateRoute: React.FC<Props> = ({ children }) => {
  const { user } = useAuth0();

  if (!user) {
    return <Navigate to="/" />;
  }

  return <>{children}</>;
};

export default PrivateRoute;
