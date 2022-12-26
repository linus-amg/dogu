# dogu
Dogu is a JavaScript React utility toolkit which provides proven solutions to common user experience challenges. It is very opinionated and is designed to be used in a specific way. It is not a general purpose library. Sorry. It needs to be used in combination with @chakra-ui/react.

## Inspiration

> In Japanese there is a 
word for all objects made, 
designed, and improved by 
people: **dogu**.

> The **dogu**, 
the object or objects that 
people live with, represent 
the owner’s personality. 
One enters into a relation- 
ship with dogu, a dialogue.

## Installation
```bash
$ npm install dogu
```
Yes it is a lot of dependencies, this might not be for you.

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

Use the `getFormModalData()` method to open a modal with a form and await completion of the modal, in form of filling and submitting or closing (cancelling).

```javascript

import { getFormModalData } from 'dogu';

const addItemFormMetadata = {
  title: 'Add Item',
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
    const { data, cancelled } = await getFormModalData(addItemFormMetadata);

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

Use the `getConfirmationModalData()` method to open a modal with a confirmation message and await completion of the modal, in form of confirming or closing (cancelling).

```javascript
import { getConfirmationModalData } from 'dogu';

function DeleteAccount() {

  const handleAccountDeletionClick = async () => {
    const confirmed = await getConfirmationModalData({
      title: 'Delete Account',
      message: 'Are you sure?'
    });

  return (
    <Button onClick={handleAccountDeletionClick}>delete account</Button>
  )
}
```

Use the `getPromptModalData()` method to open a modal with a prompt message and await completion of the modal, in form of confirming or closing (cancelling).

```javascript
import { getPromptModalData } from 'dogu';

function DeleteAccount() {

  const handleAccountDeletionClick = async () => {
    const { data, cancelled } = await getConfirmationModalData({
      title: 'Delete Account',
      message: 'Please write "delete" to confirm.'
    });

    if (data.input === 'delete') {
      // do something
    }
  }

  return (
    <Button onClick={handleAccountDeletionClick}>delete account</Button>
  )
}
```

