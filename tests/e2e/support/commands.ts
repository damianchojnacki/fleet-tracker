import { LoginResponse } from './index'

Cypress.Commands.add('login', (email = 'user@example.com', password = 'password') => {
    return cy
        .csrfToken()
        .then((headers) => {
            const token = decodeURIComponent(headers['set-cookie'][0].split('=')[1].split(';')[0])

            cy.request({
                method: 'POST',
                url: `${Cypress.env('apiUrl')}/api/login`,
                body: {
                    email,
                    password,
                },
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'X-Xsrf-Token': token,
                },
            })
        })

})

/**
 * Fetch a CSRF token.
 *
 * @example cy.csrfToken();
 */
Cypress.Commands.add('csrfToken', () => {
    return cy
        .request({
            method: 'GET',
            url: `${Cypress.env('apiUrl')}/sanctum/csrf-cookie`,
            log: false,
        })
        .its('headers', { log: false });
});


Cypress.Commands.add('getCy', (value: string) => {
    return cy.get(`[data-cy=${value}]`);
});
