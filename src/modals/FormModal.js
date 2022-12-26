import {
  Button,
  FormControl,
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
  useDisclosure,
  VStack
} from '@chakra-ui/react';
import serialize from 'form-serialize';
import { useEffect, useRef, useState } from 'react';

import { stores } from '../stores/contexts/storesContext'

function Field({ field, initialRef }) {
  const [state, setState] = useState(field.defaultChecked);

  const toggle = () => {
    setState(!state);
  };

  if (field.type === 'text') {
    return (
      <FormControl key={field.name}>
        <FormLabel>{field.label}</FormLabel>
        <Input
          ref={initialRef}
          name={field.name}
          type={field.type}
          required={field.required}
        />
      </FormControl>
    );
  }
  if (field.type === 'number') {
    return (
      <FormControl key={field.name}>
        <FormLabel>{field.label}</FormLabel>
        <Input
          ref={initialRef}
          name={field.name}
          type={field.type}
          required={field.required}
        />
      </FormControl>
    );
  }
  if (field.type === 'info') {
    return (
      <FormControl key={field.name}>
        <FormLabel>
          <Text fontSize={13} color="gray.500">
            {field.label}
          </Text>
        </FormLabel>
      </FormControl>
    );
  }
  if (field.type === 'checkbox') {
    return (
      <FormControl key={field.name}>
        <HStack>
          <Switch
            name={field.name}
            onChange={toggle}
            id="redirect"
            value="true"
            isChecked={state}
          />
          <FormLabel htmlFor="redirect">{field.label}</FormLabel>
        </HStack>
      </FormControl>
    );
  }
}

function Body({ fields, description, initialRef }) {
  return (
    <ModalBody pb={6}>
      <Text marginBottom={6}>{description}</Text>
      <VStack spacing={5}>
        {fields.map((field, index) => (
          <Field
            key={field.name}
            field={field}
            initialRef={index === 0 ? initialRef : null}
          />
        ))}
      </VStack>
    </ModalBody>
  )
}

function Footer({ handleClose }) {
  return (
    <ModalFooter justifyContent="space-between">
      <Button size="md" variant="ghost" onClick={handleClose}>
        Cancel
      </Button>
      <Button
        size="md"
        type="submit"
        variant="outline"
        colorScheme="blue"
      >
        Save
      </Button>
    </ModalFooter>
  )
}

function ModalForm({ handleSubmit, title, description, fields, initialRef, handleClose }) {
  return (
    <form onSubmit={handleSubmit}>
      <ModalHeader>{title}</ModalHeader>
      <ModalCloseButton mt={4} mr={3} />
      <Body description={description} fields={fields} initialRef={initialRef} />
      <Footer handleClose={handleClose} />
    </form>
  )
}

function FormModal({ fields, title, description, resolve, finalRef }) {
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
      isCentered
    >
      <ModalOverlay />
      <ModalContent pb={2} pt={3}>
        <ModalForm
          title={title}
          description={description}
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
