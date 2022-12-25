/*
 * Copyright Cero Uno GmbH and/or licensed to Cero Uno GmbH
 * under one or more contributor license agreements. Licensed under a proprietary license.
 * See the License.txt file for more information. You may not use this file
 * except in compliance with the proprietary license.
 */

/* eslint-disable import/prefer-default-export */
import { stores } from '~client/stores/contexts/storesContext';

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
