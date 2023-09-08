import './e2e'

export interface LoginResponse {
    token: string;
}

declare global {
    namespace Cypress {
        interface Chainable {
            /**
             * Custom command to select DOM element by data-cy attribute.
             * @example cy.dataCy('greeting')
             */
            login(email?: string, password?: string): Chainable<{[p: string]: string | string[]}>
            csrfToken(): Chainable<{[p: string]: string | string[]}>
            getCy(
                value: string,
            ): Chainable<JQuery<HTMLElementTagNameMap[keyof HTMLElementTagNameMap]>>
            state(name: string): any
        }
    }
}

export const randomString = (length: number) => {
    const arr = new Uint8Array((length || 40) / 2);

    window.crypto.getRandomValues(arr);

    function decToHex(dec: number) {
        return dec.toString(16);
    }

    return Array.from(arr, decToHex).join('');
};
