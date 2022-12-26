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
