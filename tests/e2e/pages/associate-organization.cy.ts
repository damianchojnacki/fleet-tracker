import {randomString} from "../support"

describe('Associate Organization Page', () => {
    it('should redirect the Associate Organization page if user has no organization assigned', () => {
        cy.login();
        cy.visit('/dashboard');

        cy.url().should('contain', 'associate-organization');
    });

    it('should display the Associate Organization page correctly', () => {
        cy.login();
        cy.visit('/associate-organization');

        cy.contains('Organization name').should('be.visible');
        cy.contains('Create').should('be.visible');
        cy.contains('Logout').should('be.visible');
    });

    it('should not allow to submit an empty form', () => {
        cy.login();
        cy.visit('/associate-organization');

        cy.intercept(`${Cypress.env('apiUrl')}/api/organization-invitation/*`).as('request');

        // Submit the form without filling in the email
        cy.get('form').submit();

        cy.get('@request.all').then((interceptions) => {
            expect(interceptions).to.have.length(0);
        });
    });

    it('should successfully submit the form with a valid name', () => {
        cy.login();
        cy.visit('/associate-organization');

        const validName = randomString(10);

        // Enter a valid email address
        cy.get('input[name="name"]').type(validName);

        // Submit the form
        cy.get('form').submit();

        // Verify that a success message is displayed
        cy.contains("Organization created").should('be.visible');
        cy.url().should('contain', 'dashboard');
    });

    it('should display accept invitation error invalid signature', () => {
        cy.login('invited@example.com');
        cy.visit('/associate-organization?id=1&signature=invalid');

        cy.contains("Invalid signature").should('be.visible');
    });
});
