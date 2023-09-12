import { LoginResponse } from './index'
import { setCookie } from 'cookies-next'

Cypress.Commands.add('login', (email = 'user@example.com', password = 'password') => {
    return cy.request<LoginResponse>({
        method: 'POST',
        url: `${Cypress.env('apiUrl')}/api/login`,
        body: {
            email,
            password,
        },
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
    }).then((response) => setCookie('token', response.body.token))
})

Cypress.Commands.add('getCy', (value: string) => {
    return cy.get(`[data-cy=${value}]`)
})
