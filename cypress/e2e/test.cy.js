/// <reference types="Cypress" />
import { loginPage } from "../support/pom_objects/loginPageElements";
import { productPage } from "../support/pom_objects/productsPageElements";

describe("Automation Exercise", () => {
  beforeEach(() => {
    //Should open Home Page
    cy.openHomePage();
  });

  it("User should signup and login successfully", () => {
    cy.contains(loginPage.signupMenuItem).click();

    //Enter primary information
    cy.enterPrimaryUserInfo("Slavko");

    //Enter remaining information
    cy.enterRemainingUserInfo();

    //Account Created!
    cy.contains("Account Created!").should("be.visible");

    //Dismiss confirmation
    cy.contains("Continue").click();

    //User is successfully logged
    cy.contains("Logout").should("be.visible");
  });

  it("Feature section and listed brands should have 34 products", () => {
    //Verify that the features category has 34 products
    cy.get(".features_items .single-products").should("have.length", 34);

    //Sum products counts for each brand listed under ‘BRANDS’
    let counter = 0;
    cy.get(".brands-name .pull-right")
      .each((elements) => {
        let x = elements.text().replace(/[{()}]/g, "");
        counter += Number(x);
      })
      .then(() => {
        expect(counter).to.deep.equal(34);
      });
  });

  it("Woman dress category should have 3 products listed", () => {
    //Filter products
    cy.filterWomanDresses();

    //Verify that 3 products are listed
    cy.get(productPage.productItems).should("have.length", 3);

    //Ensure that the file is empty
    cy.writeFile("dresses.txt", "Dresses:\n");

    //White dress titles to file
    cy.get(productPage.productItemsTitle).each((title) => {
      cy.log(title.text());
      cy.writeFile("dresses.txt", title.text() + "\n", { flag: "a+" });
    });
  });
});
