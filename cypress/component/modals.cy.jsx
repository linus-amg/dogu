import React from 'react';

import App from './App'

describe('Modals', () => {
  describe("Confirmation", () => {

    beforeEach(() => {
      const onChangeSpy = cy.spy().as('onChangeSpy');
      cy.mount(<App onChange={onChangeSpy} />);
    })

    it('returns confirmed true when clicking the confirm button', () => {
      cy.getBySel('delete-account').click();
      cy.getBySel('confirm-button').click();

      cy.get('@onChangeSpy').should('have.been.calledWith', true);
    });

    it('returns confirmed false when clicking the cancel button', () => {
      cy.getBySel('delete-account').click();
      cy.getBySel('cancel-button').click();

      cy.get('@onChangeSpy').should('have.been.calledWith', false);
    });
  });

  describe('Form', () => {
    beforeEach(() => {
      const onChangeSpy = cy.spy().as('onChangeSpy');
      cy.mount(<App onChange={onChangeSpy} />);
    });

    it('returns cancelled if the modal was closed without submitting data', () => {
      cy.getBySel('create-user').click();
      cy.getBySel('cancel-button').click();

      cy.get('@onChangeSpy').should((spy) => {
        expect(spy).to.have.been.calledWith({ canceled: true, data: undefined });
      });
    });

    it('returns the data if the modal was submitted', () => {
      cy.getBySel('create-user').click();

      cy.getBySel('field-name').type('John Doe');
      cy.getBySel('field-email').type('john.doe@company.co');
      cy.getBySel('field-bio').type('About me...');
      cy.getBySel('submit-button').click();

      cy.get('@onChangeSpy').should((spy) => {
        expect(spy).to.have.been.calledWith({ canceled: false, data: { name: 'John Doe', email: 'john.doe@company.co', bio: 'About me...' } });
      });
    });
  });
})