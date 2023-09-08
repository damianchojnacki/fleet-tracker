import {randomString} from "../support"

describe('Register Page', () => {
    beforeEach(() => {
        cy.visit('/register'); // Adjust the URL as needed
    });

    it('should display the Register page correctly', () => {
        // Verify the page title or any other relevant content
        cy.contains('Register').should('be.visible');
        cy.contains('Already registered?').should('be.visible');
        cy.get('button').should('contain', 'Register').should('be.visible');
    });

    it('should not allow to submit empty form', () => {
        cy.intercept(`${Cypress.env('apiUrl')}/api/register`).as('request');

        // Submit the form without filling in any fields
        cy.get('form').submit();

        cy.get('@request.all').then((interceptions) => {
            expect(interceptions).to.have.length(0);
        });
    });

    it('should successfully submit the form with valid inputs', () => {
        const validData = {
            firstname: 'John',
            lastname: 'Doe',
            email: `${randomString(10)}@example.com`,
            password: 'password',
            passwordConfirmation: 'password',
        };

        // Fill in the form with valid data
        cy.get('input[name="firstname"]').type(validData.firstname);
        cy.get('input[name="lastname"]').type(validData.lastname);
        cy.get('input[name="email"]').type(validData.email);
        cy.get('input[name="password"]').type(validData.password);
        cy.get('input[name="passwordConfirmation"]').type(validData.passwordConfirmation);

        // Submit the form
        cy.get('form').submit();

        // Verify that user is redirected to verify email page
        cy.url().should('include', '/verify-email');

        cy.contains('Thanks for signing up!').should('be.visible');
    });

    it('should display an error message for an existing email', () => {
        const existingEmail = 'user@example.com';

        const validData = {
            firstname: 'John',
            lastname: 'Doe',
            password: 'password',
            passwordConfirmation: 'password',
        };

        // Fill in the form with valid data
        cy.get('input[name="firstname"]').type(validData.firstname);
        cy.get('input[name="lastname"]').type(validData.lastname);
        cy.get('input[name="password"]').type(validData.password);
        cy.get('input[name="passwordConfirmation"]').type(validData.passwordConfirmation);

        // Enter an invalid email address
        cy.get('input[name="email"]').type(existingEmail);

        // Submit the form
        cy.get('form').submit();

        // Verify that an error message is displayed for the email field
        cy.contains('The email has already been taken.').should('be.visible');
    });
});
