import React from 'react'
import {
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  HStack,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Switch,
  Text,
  Textarea,
  useDisclosure,
  VStack
} from '@chakra-ui/react';
import serialize from 'form-serialize';
import { useEffect, useRef, useState } from 'react';

import { stores } from '../stores/contexts/storesContext'

function Field({ field, initialRef, size }) {
  const [state, setState] = useState(field.defaultChecked);

  const toggle = () => {
    setState(!state);
  };

  if (['text', 'number'].includes(field.type)) {
    return (
      <>
        {field.label && <FormLabel>{field.label}</FormLabel>}
        <Input
          ref={initialRef}
          data-cy={`field-${field.name}`}
          size={size}
          {...field}
        />
        {field.helperText && <FormHelperText>{field.helperText}</FormHelperText>}
      </>
    );
  }

  if (field.type === 'textarea') {
    return (
      <>
        {field.label && <FormLabel>{field.label}</FormLabel>}
        <Textarea
          ref={initialRef}
          data-cy={`field-${field.name}`}
          rows={4}
          size={size}
          {...field}
        />
        {field.helperText && <FormHelperText>{field.helperText}</FormHelperText>}
      </>
    )
  }

  if (field.type === 'info') {
    return (
      <>
        <FormLabel>
          <Text fontSize={13} color="gray.500" data-cy={`field-${field.name}`}>
            {field.label}
          </Text>
        </FormLabel>
      </>
    );
  }

  if (field.type === 'checkbox') {
    return (
      <>
        <HStack>
          <Switch
            name={field.name}
            onChange={toggle}
            data-cy={`field-${field.name}`}
            value="true"
            isChecked={state}
            size={size}
          />
          <FormLabel htmlFor="redirect">{field.label}</FormLabel>
        </HStack>
        {field.helperText && <FormHelperText>{field.helperText}</FormHelperText>}
      </>
    );
  }
}

function Body({ fields, message, initialRef, size }) {
  return (
    <ModalBody pb={6}>
      {message && <Text marginBottom={6}>{message}</Text>}
      <VStack spacing={5}>
        {fields.map((field, index) => (
          <FormControl key={field.name} size={size}>
            <Field
              key={field.name}
              field={field}
              size={size}
              initialRef={index === 0 ? initialRef : null}
            />
          </FormControl>
        ))}
      </VStack>
    </ModalBody>
  )
}

function Footer({ handleClose, submitButtonColor = 'purple', size }) {
  return (
    <ModalFooter justifyContent="space-between">
      <Button size="md" variant="ghost" data-cy="cancel-button" onClick={handleClose}>
        Cancel
      </Button>
      <Button
        size={size}
        type="submit"
        data-cy="submit-button"
        variant="outline"
        colorScheme={submitButtonColor}
      >
        Save
      </Button>
    </ModalFooter>
  )
}

function ModalForm({ handleSubmit, title, message, fields, initialRef, handleClose, submitButtonColor, submitButtonText, size }) {
  return (
    <form onSubmit={handleSubmit}>
      <ModalHeader>{title}</ModalHeader>
      <ModalCloseButton mt={4} mr={3} />
      <Body message={message} fields={fields} initialRef={initialRef} size={size} />
      <Footer handleClose={handleClose} submitButtonColor={submitButtonColor} submitButtonText={submitButtonText} size={size} />
    </form>
  )
}

function FormModal({ fields, title, message, resolve, finalRef, isCentered = true, size = "md" }) {
  const { isOpen, onOpen, onClose } = useDisclosure({});

  const initialRef = useRef();

  useEffect(() => {
    onOpen();
  }, []);

  const handleClose = () => {
    resolve({ canceled: true });

    onClose();
    stores.modalsStore.delayedReset();
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    onClose();
    stores.modalsStore.delayedReset();

    const data = serialize(evt.target, { hash: true });

    if (Object.keys(data).length > 0) {
      resolve({ canceled: false, data });
    } else {
      resolve({ canceled: true });
    }
  };

  return (
    <Modal
      finalFocusRef={finalRef}
      initialFocusRef={initialRef}
      closeOnOverlayClick={false}
      isOpen={isOpen}
      onClose={handleClose}
      isCentered={isCentered}
    >
      <ModalOverlay />
      <ModalContent pb={2} pt={3}>
        <ModalForm
          size={size}
          title={title}
          message={message}
          fields={fields}
          initialRef={initialRef}
          handleClose={handleClose}
          handleSubmit={handleSubmit}
        />
      </ModalContent>
    </Modal>
  );
}

export default FormModal;
