/*
 * Copyright Cero Uno GmbH and/or licensed to Cero Uno GmbH
 * under one or more contributor license agreements. Licensed under a proprietary license.
 * See the License.txt file for more information. You may not use this file
 * except in compliance with the proprietary license.
 */

import { observer } from 'mobx-react';

import { useStores } from '../hooks/use-stores';

function YieldModals() {
  const { modalsStore } = useStores();
  return modalsStore.state.currentModal;
}

export default observer(YieldModals);
