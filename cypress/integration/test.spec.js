/// <reference types="cypress" />

describe('My firt test', () => {

    it('find the content "type"', () => {
        cy.visit('https://example.cypress.io')

        cy.contains('type').click()
        cy.url().should('include', '/commands/actions')

        cy.get('.action-email').type('test@test.com').should('have.value', 'test@test.com')
    })
})


describe('Search functionality', function(){

    before(() => {
    cy.visit('https://stage-warden.historicengland.org.uk/');
    cy.xpath(homePage.navBar).click();
    cy.xpath(homePage.searchBtn).click();
    
    cy.log('********** validate search page is displayed **********')
    cy.xpath(searchPage.searchBar).should('be.visible');

    beforeEach(()=>{
    Cypress.Cookies.preserveOnce('ai_session', 'csrftoken','warden','ai_user')
    })
    

    it('User can carry out basic search', function(){

        cy.xpath(searchPage.searchBar).click();
        cy.xpath(searchPage.resultsNumber).should('be.visible').should($elem=>{
            expect($elem).to.not.contain('undefined')
        }).then($res=>{
            let txt= $res.text();
            cy.log('Number of results: ',txt);

            cy.xpath(searchPage.findAResourceInput).type('Andover');
            cy.xpath(searchPage.searchResultsLabel).contains('Andover').click();
            cy.xpath(searchPage.resultsNumber).invoke('text').should('not.eq',txt);

        })
    })

})
})