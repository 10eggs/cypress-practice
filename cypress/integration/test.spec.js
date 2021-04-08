/// <reference types="cypress" />

/**
* I'm assuming that this spec has status work in progress, that's why I omit it for now. You can find
* one quick note about scope of 'before' hook below \/
*
**/
describe('My firt test', () => {

    it('find the content "type"', () => {
        cy.visit('https://example.cypress.io')

        cy.contains('type').click()
        cy.url().should('include', '/commands/actions')

        cy.get('.action-email').type('test@test.com').should('have.value', 'test@test.com')
    })
})


describe('Search functionality', function(){

    /**
     * Make sure that your enclosing bracket is in correct place - for now whole codeblock is nested in
     * 'before' hook, which is not the best idea!
     */
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

// describe('Authentication functionality', () => {
//     beforeEach(() => {
//         Cypress.Cookies.preserveOnce('ai_session', 'csrftoken','warden','ai_user'); 
//         cy.visit('/');   
// })


//     it('User can login using valid credentials', () => {
//         cy.log('********** sign into the application **********');
//         cy.fixture('test-data').then(function (data) {
//             this.data = data;
//         cy.xpath(homePage.navBar).click();
//         cy.xpath(homePage.signInBtn).click();
//         cy.xpath(loginPage.username).type(this.data.Username);
//         cy.xpath(loginPage.password).type(this.data.Password);
//         cy.xpath(loginPage.signInBtn).click();
//         cy.xpath(homePage.navBar).click();

//         cy.log('********** verify user is logged in **********')
//         cy.xpath(homePage.logOffBtn).contains('Log off').should('be.visible');
//         cy.xpath(homePage.logOffBtn).click();
//     })

//   })

//     it('User cannot login using invalid credentials', () =>{
//         cy.xpath(homePage.navBar).click();
//         cy.xpath(homePage.signInBtn).click();
//         cy.xpath(loginPage.username).type('test');
//         cy.xpath(loginPage.password).type('test');
//         cy.xpath(loginPage.signInBtn).click();

//         cy.log('********** verify error message is visible **********')
//         cy.get('login-failed-alert').should('be.visible');
//     })

// })