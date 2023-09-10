import './e2e'

export interface LoginResponse {
    token: string;
}

declare global {
    // eslint-disable-next-line @typescript-eslint/no-namespace
    namespace Cypress {
        interface Chainable {
            /**
             * Custom command to select DOM element by data-cy attribute.
             * @example cy.dataCy('greeting')
             */
            login(email?: string, password?: string): Chainable<Response<LoginResponse>>
            getCy(
                value: string,
            ): Chainable<JQuery<HTMLElementTagNameMap[keyof HTMLElementTagNameMap]>>
        }
    }
}

export const randomString = (length: number) => {
    const arr = new Uint8Array((length || 40) / 2)

    window.crypto.getRandomValues(arr)

    function decToHex(dec: number) {
        return dec.toString(16)
    }

    return Array.from(arr, decToHex).join('')
}
