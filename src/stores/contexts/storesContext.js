/*
 * Copyright Cero Uno GmbH and/or licensed to Cero Uno GmbH
 * under one or more contributor license agreements. Licensed under a proprietary license.
 * See the License.txt file for more information. You may not use this file
 * except in compliance with the proprietary license.
 */

import { createContext } from 'react';

import ModalsStore from '~client/stores/ModalsStore';

export const stores = {
  modalsStore: new ModalsStore()
};

export const storesContext = createContext(stores);
