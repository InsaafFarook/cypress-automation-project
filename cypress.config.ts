import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: 'https://www.saucedemo.com/',
    env: {
      apiUrl: 'https://petstore.swagger.io/v2'
    }
  },
});
