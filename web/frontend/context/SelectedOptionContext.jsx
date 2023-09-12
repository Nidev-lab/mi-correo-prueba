import React, { createContext, useContext, useState } from 'react';

const SelectedOptionContext = createContext();

export const SelectedOptionProvider = ({ children }) => {
  const [selectedOption, setSelectedOption] = useState('Api pack.ar');

  return (
    <SelectedOptionContext.Provider value={{ selectedOption, setSelectedOption }}>
      {children}
    </SelectedOptionContext.Provider>
  );
};

export const useSelectedOption = () => useContext(SelectedOptionContext);
