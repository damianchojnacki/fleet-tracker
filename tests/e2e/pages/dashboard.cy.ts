describe('Dashboard Page', () => {
    it('should display the Dashboard page correctly for a logged-in user', () => {
        cy.login()
        cy.visit('/dashboard')

        cy.contains("You're logged in!").should('be.visible')
        cy.url().should('include', '/dashboard')
    })

    it('should redirect to the login page for a guest', () => {
        cy.visit('/dashboard')

        cy.url().should('include', '/login')
    })
})
