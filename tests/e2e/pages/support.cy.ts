import { randomString } from '../support'

describe('Support Page', () => {
    it('should display the Support page correctly for a logged-in user', () => {
        cy.login()
        cy.visit('/support')

        cy.url().should('include', '/support')
    })

    it('should redirect to the login page for a guest', () => {
        cy.visit('/support')

        cy.url().should('include', '/login')
    })

    it('should allow user to create new message', () => {
        cy.login()
        cy.visit('/support')

        const message = randomString(10)

        cy.get('textarea').type(message)
        cy.get('textarea').parent().find('a').click()

        cy.getCy('message').contains(message).should('be.visible')
    })
})
