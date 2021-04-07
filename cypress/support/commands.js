Cypress.Commands.add('selectCard', (card) => {
    cy.get('span').contains(card).click();
})

Cypress.Commands.add('selectDropDownOption', (dropDownOption) => {
    cy.get('select2-results').contains(dropDownOption).click();
})

Cypress.Commands.add('clickButton', (buttonLabel) => {
    cy.get('button').contains(buttonLabel).click();
})