import { LoginResponse } from './index'

Cypress.Commands.add('login', () => {
    return cy
        .request<LoginResponse>({
            method: 'POST',
            url: `${Cypress.env('apiUrl')}/api/login`,
            body: {
                email: 'admin@example.com',
                password: 'password',
            },
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Build-Secret': Cypress.env('buildSecret'),
            },
        })
        .then((response) => {
            cy.setCookie('token', response.body.token)
        })
})

Cypress.Commands.add('getCy', (value: string) => {
    return cy.get(`[data-cy=${value}]`);
});
