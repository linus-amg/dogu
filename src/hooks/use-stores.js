import { useContext } from 'react';

import { storesContext, stores } from '../stores/contexts/storesContext';

export function StoresProvider({ children }) {
  return (
    <storesContext.Provider value={stores}>{children}</storesContext.Provider>
  );
}

export const useStores = () => useContext(storesContext);
