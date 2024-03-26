describe('Trips Page', () => {
    it('should display the Trips page correctly for a logged-in user', () => {
        cy.login()
        cy.visit('/trips')

        cy.contains('Latest trips').should('be.visible')
    })

    it('should redirect to the login page for a guest', () => {
        cy.visit('/trips')

        cy.url().should('include', '/login')
    })

    it('should redirect to the create trip page after clicking new trip button', () => {
        cy.login()
        cy.visit('/trips')

        cy.contains('New trip').click()

        cy.url().should('include', '/trips/create')
    })
})
