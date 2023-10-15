'use client';

import React from 'react';

import { Response, useGetProfile } from '@/api/user';

import { Loading } from '../components/loading';

const CurrentUserContext = React.createContext<Response | null>(null);

export const useCurrentUserContext = () => {
  const currentUser = React.useContext(CurrentUserContext);

  return currentUser;
};

export const CurrentUserContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const currentUserQuery = useGetProfile();

  if (currentUserQuery.isLoading) {
    return <Loading />;
  }

  if (currentUserQuery.isError) {
    return <p>Error is occurred...</p>;
  }

  return (
    <CurrentUserContext.Provider value={currentUserQuery.data}>
      {children}
    </CurrentUserContext.Provider>
  );
};
