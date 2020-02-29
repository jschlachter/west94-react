import React from 'react';

export const PeopleContext = React.createContext({
  isLoading: false,
  people: null,
  refresh: () => {},
});
