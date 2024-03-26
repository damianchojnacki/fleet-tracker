import { randomString } from '../../support'

describe('Create Trip Page', () => {
    it('should add a new trip', () => {
        cy.login()
        cy.visit('/trips/create')

        cy.contains('Add new trip').should('be.visible')

        cy.get('button[id=starts_at]').click()

        const day = Math.round(Math.random() * 20) + 1
        const from = randomString(10)
        const to = randomString(10)
        const note = randomString(10)

        cy.get(`button[name=day]:contains(${day})`).click()
        cy.get('input[name=from]').type(from)
        cy.get('input[name=to]').type(to)
        cy.get('input[name=note]').type(note)

        cy.contains('Save changes').click()

        cy.intercept('*api/user/trips').as('trips')

        cy.visit('/trips')

        cy.wait('@trips')

        cy.get(`td:contains(${day}.)`).should('be.visible')
        cy.get(`td:contains(${to})`).should('be.visible')
        cy.get(`td:contains(${from})`).should('be.visible')
        cy.get(`td:contains(${note})`).should('be.visible')
    })
})
