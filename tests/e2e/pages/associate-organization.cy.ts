import { randomString } from '../support'

describe('Associate Organization Page', () => {
    it('should display the Associate Organization page correctly', () => {
        cy.login()
        cy.visit('/associate-organization')

        cy.contains('Organization name').should('be.visible')
        cy.contains('Create').should('be.visible')
        cy.contains('Logout').should('be.visible')
    })

    it('should not allow to submit an empty form', () => {
        cy.login()
        cy.visit('/associate-organization')

        cy.intercept(`${Cypress.env('apiUrl')}/api/organization-invitation/*`).as('request')

        // Submit the form without filling in the email
        cy.get('form').submit()

        cy.get('@request.all').then((interceptions) => {
            expect(interceptions).to.have.length(0)
        })
    })

    it('should display accept invitation error invalid signature', () => {
        cy.login('invited@example.com')
        cy.visit('/associate-organization?id=1&signature=invalid')

        cy.contains('Invalid signature').should('be.visible')
    })
})
