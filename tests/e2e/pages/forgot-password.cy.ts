describe('Forgot Password Page', () => {
    beforeEach(() => {
        cy.visit('/forgot-password') // Adjust the URL as needed
    })

    it('should display the Forgot Password page correctly', () => {
        // Verify the page title or any other relevant content
        cy.contains('Forgot your password?').should('be.visible')
        cy.contains('Email Password Reset Link').should('be.visible')
    })

    it('should not allow to submit an empty form', () => {
        cy.intercept(`${Cypress.env('apiUrl')}/api/forgot-password`).as('request')

        // Submit the form without filling in the email
        cy.get('form').submit()

        cy.get('@request.all').then((interceptions) => {
            expect(interceptions).to.have.length(0)
        })
    })

    it('should successfully submit the form with a valid email', () => {
        const validEmail = 'user@example.com'

        // Enter a valid email address
        cy.get('input[name="email"]').type(validEmail)

        // Submit the form
        cy.get('form').submit()

        // Verify that a success message is displayed
        cy.contains('We have emailed your password reset link.').should('be.visible')
    })

    it('should display an error message for an invalid email', () => {
        const invalidEmail = 'invalid@example.com'

        // Enter an invalid email address
        cy.get('input[name="email"]').type(invalidEmail)

        // Submit the form
        cy.get('form').submit()

        // Verify that an error message is displayed for the email field
        cy.contains("We can't find a user with that email address.").should('be.visible')
    })

    it('should display an error message for a too many attempts', () => {
        const validEmail = 'user@example.com'

        // Enter a valid email address
        cy.get('input[name="email"]').type(validEmail)

        // Submit the form multiple times
        cy.get('form').submit()
        cy.get('form').submit()
        cy.get('form').submit()

        // Verify that a error message is displayed
        cy.contains('Please wait before retrying.').should('be.visible')
    })
})
