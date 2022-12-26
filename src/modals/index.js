/* eslint-disable import/prefer-default-export */
import { stores } from '../stores/contexts/storesContext';

export const getFormModalData = async (options, evt, finalRef) => {
  const FormModal = (await import('./FormModal')).default;

  return new Promise((_resolve) => {
    stores.modalsStore.setCurrentModal(
      <FormModal {...options} resolve={_resolve} finalRef={finalRef} />
    );
  });
};

export const getConfirmationModal = async (options, evt, finalRef) => {
  const ConfirmationModal = (await import('./ConfirmationModal')).default;

  return new Promise((_resolve) => {
    stores.modalsStore.setCurrentModal(
      <ConfirmationModal {...options} resolve={_resolve} finalRef={finalRef} />
    );
  });
};
