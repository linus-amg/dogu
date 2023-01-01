import React from 'react'
import { observer } from 'mobx-react';

import { useStores } from '../hooks/use-stores';

function YieldModals() {
  const { modalsStore } = useStores();
  return modalsStore.state.currentModal;
}

export default observer(YieldModals);
