describe('Login Page Tests', () => {
    beforeEach(() => {
        // Visit the login page before each test
        cy.visit('/login') // Update the URL as needed
    })

    it('should display the login form', () => {
        // Check if the email input field is present
        cy.get('input[type="email"]').should('be.visible')

        // Check if the password input field is present
        cy.get('input[type="password"]').should('be.visible')

        // Check if the "Remember Me" checkbox is present
        cy.get('button[role="checkbox"]').should('be.visible')

        // Check if the "Login" button is present
        cy.get('button').should('be.visible')

        // Check if the "Forgot Password" link is present
        cy.contains('Forgot Password').should('be.visible')
    })

    it('should show an error message for invalid login', () => {
        // Type an invalid email and password
        cy.get('input[type="email"]').type('invalid@example.com')
        cy.get('input[type="password"]').type('wrongpassword')

        // Click the "Login" button
        cy.contains('button', 'Sign In').click()

        // Check for an error message
        cy.contains('These credentials do not match our records.').should('exist')
    })

    it('should allow a user to log in successfully', () => {
        // Type a valid email and password
        cy.get('input[type="email"]').type('user@example.com')
        cy.get('input[type="password"]').type('password')

        // Click the "Login" button
        cy.contains('button', 'Sign In').click()

        cy.url().should('include', '/dashboard')
    })

    it('should navigate to the "Forgot Password" page when the link is clicked', () => {
        // Click the "Forgot your password?" link
        cy.contains('Forgot Password').click()

        // Check if the URL has changed to the password reset page
        cy.contains('Please enter your email address and we’ll send you instructions on to how to reset your password')
    })
})
