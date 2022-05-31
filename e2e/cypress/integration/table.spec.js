const AMOUNT_TOTAL = 15;
const AMOUNT_BARMER = 6;
const AMOUNT_BARMER_ACTIVE = 3;

describe("<Table />", () => {
  it("can be searched and filtered", () => {
    cy.visit("http://localhost:3000");

    // 1. Initial Table
    cy.get("tbody tr").should("have.length", AMOUNT_TOTAL);

    // 2. Table after using Search Bar
    cy.get("input[placeholder*='Search']").type("Barmer{enter}");

    cy.get("tbody tr").should("have.length", AMOUNT_BARMER);

    // 3. Table after using Filter
    cy.get("button[aria-label='Filter Policies']").click();

    cy.contains("label", "Status").parent().get("select").select("ACTIVE");

    cy.get("tbody tr").should("have.length", AMOUNT_BARMER_ACTIVE);
  });
});
