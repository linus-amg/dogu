import { createContext } from 'react';

import ModalsStore from '../ModalsStore';

export const stores = {
  modalsStore: new ModalsStore()
};

export const storesContext = createContext(stores);
