/// <reference types="cypress" />

describe('Angular Action-List workflows', () => {

    it('loads correctly and actions function', () => {
        cy.visit('localhost:4200');
        cy.get('[data-cy=pxb-toolbar]')
            .should('contain', 'Action list')
            .should('contain', 'delete')
            .should('contain', 'add');
        cy.get('.mat-list-item-content').should('have.length', '10');
        cy.get('[data-cy=action-menu]').first().click({ force: true });
        cy.get('[data-cy=remove]').should('contain', 'Remove');
        cy.get('[data-cy=details]').should('contain', 'View Details');
        cy.get('[data-cy=remove]').click();
        cy.get('.mat-list-item-content').should('have.length', '9');
        cy.get('[data-cy="add item"]').click();
        cy.get('.mat-list-item-content').should('have.length', '10');
        cy.get('[data-cy=delete-all]').click();
        cy.get('.mat-list-item-content').should('have.length', '0');
        cy.get('.ng-star-inserted > h1').should('contain', 'No Items found');
        cy.get('[data-cy=add-item]').click();
        cy.get('.mat-list-item-content').should('have.length', '1');
        cy.get('[data-cy="add item"]').click();
        cy.get('.mat-list-item-content').should('have.length', '2')


    });
});