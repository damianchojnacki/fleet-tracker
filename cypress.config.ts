import {defineConfig} from "cypress"
import { config } from 'dotenv';

config();

module.exports = defineConfig({
    e2e: {
        watchForFileChanges: false,
        specPattern: "tests/e2e/**/*.cy.ts",
        supportFile: "tests/e2e/support/index.ts",
        fixturesFolder: "tests/e2e/fixtures",
        downloadsFolder: "tests/e2e/downloads",
        videosFolder: "tests/e2e/videos",
        screenshotsFolder: "tests/e2e/screenshots",
        baseUrl: "http://localhost:3000",
        env: {
            apiUrl: process.env.NEXT_PUBLIC_API_URL,
        },
        setupNodeEvents(on, config) {
            on('task', {
                log(message) {
                    console.log(message);
                    return null;
                },
            });
        },
    },
})
