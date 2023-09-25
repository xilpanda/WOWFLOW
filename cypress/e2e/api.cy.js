/// <reference types="Cypress" />

describe("API", () => {
  it("Should return User List successfully", () => {
    cy.request("https://reqres.in/api/users").then((response) => {
      expect(response.status).to.eq(200);
    });
  });

  it("Should login unsuccessfully", () => {
    cy.request({
      method: "POST",
      url: "https://reqres.in/api/login",
      headers: {
        accept: "application/json",
      },
      body: {
        email: "sandro.holt@reqres.in",
        password: "testsandro",
      },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(400);
    });
  });

  it("Should successfully delete the user", () => {
    cy.request({ method: "DELETE", url: "https://reqres.in/api/users/2" }).then(
      (response) => {
        expect(response.status).to.eq(204);
      }
    );
  });

  it("Should verify 5-second Delay of request", () => {
    cy.request("https://reqres.in/api/users?delay=5").then((response) => {
      expect(response.status).to.eq(200);
    });
  });
});
