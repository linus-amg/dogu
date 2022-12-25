/*
 * Copyright Cero Uno GmbH and/or licensed to Cero Uno GmbH
 * under one or more contributor license agreements. Licensed under a proprietary license.
 * See the License.txt file for more information. You may not use this file
 * except in compliance with the proprietary license.
 */

import { action, makeAutoObservable } from 'mobx';

const DEFAULT_STATE = {
  currentModal: null
};

class ModalsStore {
  state = { ...DEFAULT_STATE };

  constructor() {
    makeAutoObservable(this);
  }

  setCurrentModal = action((modal) => {
    this.state.currentModal = modal;
  });

  reset = action(() => {
    this.state = { ...DEFAULT_STATE };
  });

  delayedReset = (ms = 300) => {
    setTimeout(() => {
      this.reset();
    }, ms);
  };
}

export default ModalsStore;
