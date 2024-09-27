describe("Map Application", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/");
    cy.get(".ol-viewport", { timeout: 10000 }).should("be.visible");
  });

  it("should display the title", () => {
    cy.get('[data-testId="cypress-title"]')
      .should("exist")
      .should("have.text", "Interactive Map Application");
  });

  it("loads the map and displays markers", () => {
    cy.get(".ol-viewport").should("exist");
    cy.get(".ol-layer").should("exist");
  });

  it("allows zooming in and out", () => {
    cy.get('button[title="Zoom In"]').click();
    cy.get('button[title="Zoom Out"]').click();
  });

  it("should interact with a marker", () => {
    const markerX = 500; // Adjust based on where a marker is on the canvas
    const markerY = 400;

    cy.get("canvas").click(markerX, markerY);
    cy.wait(1000); // Adjust the wait time as necessary

    cy.get(".ol-overlay-container", { timeout: 10000 })
      .should("be.visible")
      .and("contain.text", "Expected details for the clicked marker"); // Adjust this as needed
  });
});
