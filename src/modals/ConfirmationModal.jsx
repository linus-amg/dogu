import React from 'react'
import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure
} from '@chakra-ui/react';

import { useEffect, useRef } from 'react';
import { stores } from '../stores/contexts/storesContext';

function ModalForm({ handleClose, handleSubmit, title, message, confirmButtonText, confirmButtonColor }) {
  return (
    <form onSubmit={handleSubmit}>
      <ModalHeader>{title}</ModalHeader>
      <ModalCloseButton mt={4} mr={3} />
      <ModalBody>
        <Text>{message}</Text>
      </ModalBody>
      <ModalFooter justifyContent="space-between">
        <Button
          size="md"
          variant="ghost"
          type="button"
          data-cy="cancel-button"
          onClick={handleClose}
        >
          Cancel
        </Button>
        <Button
          size="md"
          variant="outline"
          type="submit"
          data-cy="confirm-button"
          colorScheme={confirmButtonColor}
        >
          {confirmButtonText}
        </Button>
      </ModalFooter>
    </form>
  )
}

function ConfirmationModal({
  title,
  message,
  confirmButtonText = 'Confirm',
  confirmButtonColor = 'purple',
  resolve,
  finalRef
}) {
  const { isOpen, onOpen, onClose } = useDisclosure({});

  const initialRef = useRef();

  useEffect(() => {
    onOpen();
  }, []);

  const handleClose = () => {
    resolve(false);

    onClose();
    stores.modalsStore.delayedReset();
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    onClose();
    stores.modalsStore.delayedReset();

    resolve(true);
  };

  return (
    <Modal
      finalFocusRef={finalRef}
      initialFocusRef={initialRef}
      closeOnOverlayClick={false}
      isOpen={isOpen}
      onClose={handleClose}
      isCentered
    >
      <ModalOverlay />
      <ModalContent pb={2} pt={3}>
        <ModalForm
          handleClose={handleClose}
          handleSubmit={handleSubmit}
          title={title}
          message={message} 
          confirmButtonColor={confirmButtonColor}
          confirmButtonText={confirmButtonText}
        />
      </ModalContent>
    </Modal>
  );
}

export default ConfirmationModal;
