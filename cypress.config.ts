import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: 'https://google.com',
    env: {
      apiUrl: 'https://my-api-app.com'
    }
  },
});
