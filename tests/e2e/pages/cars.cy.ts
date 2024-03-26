describe('Cars Page', () => {
    it('should display the Cars page correctly for a logged-in user', () => {
        cy.login()
        cy.visit('/cars')

        cy.url().should('include', '/cars')
    })

    it('should redirect to the login page for a guest', () => {
        cy.visit('/cars')

        cy.url().should('include', '/login')
    })

    it('should allow user to select vehicle', () => {
        cy.login()
        cy.visit('/cars')

        cy.getCy('name').first().invoke('text').as('name')
        cy.contains('Select').click()

        cy.get('@name').then((name) => {
            const [brand, model] = name.toString().split(' ')

            cy.contains('Current vehicle').parent().contains(brand).should('be.visible')
            cy.contains('Current vehicle').parent().contains(model).should('be.visible')
        })
    })
})
