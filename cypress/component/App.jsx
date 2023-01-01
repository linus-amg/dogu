import React from 'react'
import { Button, ChakraProvider } from '@chakra-ui/react'

import { getConfirmation, getFormData, YieldModals } from '../../src'

const App = ({ onChange }) => {
  const handleAccountDeletion = async () => {
    const confirmed = await getConfirmation({ "title": "Delete Account", "message": "Are you sure you want to delete your account?" });
    onChange(confirmed);
  }

  const handleUserCreation = async () => {
    const { canceled, data } = await getFormData({ title: 'Create User', description: 'fill out the fields below and click submit to create a new user', fields: [{ name: 'name', type: 'text', label: 'Name' }, { name: 'email', type: 'text', label: 'Email' }, { name: 'bio', type: 'textarea', label: 'Bio' }] });
    onChange({ canceled, data });
  }

  return (
    <ChakraProvider>
      <Button data-cy="delete-account" onClick={handleAccountDeletion}>Delete Account</Button>
      <Button data-cy="create-user" onClick={handleUserCreation}>Create User</Button>
      <YieldModals />
    </ChakraProvider>
  )
}

export default App;