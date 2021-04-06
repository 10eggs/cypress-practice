Cypress.Commands.add('selectCard', (card) => {
    cy.get('span').contains(card).click()
})