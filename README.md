# dogu
Dogu is a JavaScript React utility toolkit which provides proven solutions to common user experience challenges. It is very opinionated and is designed to be used in a specific way. It is not a general purpose library. Sorry. It needs to be used in combination with @chakra-ui/react.

## Inspiration

> In Japanese there is a 
word for all objects made, 
designed, and improved by 
people: **dogu**. The **dogu**, 
the object or objects that 
people live with, represent 
the owner’s personality. 
One enters into a relation- 
ship with dogu, a dialogue.

> From the book *10 Principles of Design* by **Cees W. de Jong**

## Installation
```bash
$ npm install dogu
```

## Usage
Render the component which will render and contain all the modals.
```javascript

import { YieldModals } from 'dogu';

function App() {
  return (
    <>
      {/** here in your App Component or somewhere else **/}
      <YieldModals />
    </>
  );
}
```

Use the `getFormData()` method to open a modal with a form and await completion of the modal, in form of filling and submitting or closing (cancelling).

```javascript

import { getFormData } from 'dogu';

const addItemFormMetadata = {
  title: 'Add Item',
  message: '...',
  fields: [
    {
      name: 'name',
      label: 'Name',
      type: 'text',
      required: true,
    },
  ],
};

function InventoryList() {

  const handleAddItemClick = async () => {
    const { data, cancelled } = await getFormData(addItemFormMetadata);

    if (data && !cancelled) {
      // do something with the data object
    }
  }

  return (
    <>
      <Button onClick={handleAddItemClick}>add</Button>

      <List />
    </>
  )
}

```

Use the `getConfirmation()` method to open a modal with a confirmation message and await completion of the modal, in form of confirming or closing (cancelling).

```javascript
import { getConfirmation } from 'dogu';

function DeleteAccount() {

  const handleAccountDeletionClick = async () => {
    const confirmed = await getConfirmation({
      title: 'Delete Account',
      message: 'Are you sure?'
    });

  return (
    <Button onClick={handleAccountDeletionClick}>delete account</Button>
  )
}
```

Use the `getPrompt()` method to open a modal with a prompt message and await completion of the modal, in form of confirming or closing (cancelling).

```javascript
import { getPrompt } from 'dogu';

function DeleteAccount() {

  const handleAccountDeletionClick = async () => {
    const { data, cancelled } = await getPrompt({
      title: 'Delete Account',
      message: 'Please write "delete" to confirm.',
      required: true
    });

    if (data === 'delete') {
      // do something
    }
  }

  return (
    <Button onClick={handleAccountDeletionClick}>delete account</Button>
  )
}
```

