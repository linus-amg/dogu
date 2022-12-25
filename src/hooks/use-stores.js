/*
 * Copyright Cero Uno GmbH and/or licensed to Cero Uno GmbH
 * under one or more contributor license agreements. Licensed under a proprietary license.
 * See the License.txt file for more information. You may not use this file
 * except in compliance with the proprietary license.
 */

import { useContext } from 'react';

import { storesContext, stores } from '../stores/contexts/storesContext';

export function StoresProvider({ children }) {
  return (
    <storesContext.Provider value={stores}>{children}</storesContext.Provider>
  );
}

export const useStores = () => useContext(storesContext);
