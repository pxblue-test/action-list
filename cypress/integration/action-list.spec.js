/// <reference types="cypress" />


describe('React Action List & actions', () => {

    it('app loads correctly and actions function', () => {
        window.cy.visit('localhost:3000');
        cy.get('[data-cy=pxb-toolbar]')
            .should('contain', 'Action List');
        cy.get('[data-cy=list-content]')
            .children()
            .should('have.length', '10');
        cy.get('[data-cy=toolbar-delete]').click()
        cy.get('[data-cy=list-content]')
            .children()
            .should('have.length', '0');
        cy.contains('No Items Found');
        cy.get('[data-cy=add-item]').click()
        cy.get('[data-cy=list-content]')
            .children()
            .should('have.length', '1');
        cy.get('[data-cy=toolbar-add]').click()
        cy.get('[data-cy=list-content]')
            .children()
            .should('have.length', '2');
        cy.get('[data-cy=action-menu]').first().click()
        cy.get('.MuiPaper-root-10 > .MuiList-root-95 > [tabindex="0"]').click()
        cy.get('[data-cy=list-content]')
            .children()
            .should('have.length', '1');


    });
});