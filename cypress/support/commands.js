// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

import { loginPage } from "./pom_objects/loginPageElements";

Cypress.Commands.add("openHomePage", () => {
  cy.viewport(1280, 800);
  cy.visit("/");
});

Cypress.Commands.add("createUniqueEmail", () => {
  let now = new Date().getTime();
  let timestamp = now.toString();
  return "user" + timestamp + "@example.com";
});

Cypress.Commands.add("enterPrimaryUserInfo", (name) => {
  cy.get(loginPage.singnupName).type(name);
  cy.createUniqueEmail().then((email) => {
    cy.get(loginPage.signupEmail).type(email);
  });
  cy.get(loginPage.signupButtonOne).click();
});

Cypress.Commands.add("enterRemainingUserInfo", () => {
  cy.get(loginPage.signupGender).check();
  cy.get(loginPage.signupPass).type("test100");
  cy.get(loginPage.signupFirsName).type("Alex");
  cy.get(loginPage.signupLastName).type("Vukovic");
  cy.get(loginPage.signupAddress).type("Vidovdanska");
  cy.get(loginPage.signupCountry).select("United States");
  cy.get(loginPage.signupState).type("Texas");
  cy.get(loginPage.signupCity).type("Huston");
  cy.get(loginPage.signupZip).type("77001");
  cy.get(loginPage.signupMobile).type("210-262-0609");
  cy.get(loginPage.signupButtonTwo).click();
});

Cypress.Commands.add("filterWomanDresses", () => {
  cy.contains("Products").click();
  cy.contains("Women").click();
  cy.contains("Dress").click();
});
