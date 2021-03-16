/// <reference types="cypress" />

// import { webElements as homePage } from '../POM/home_page'
// import { webElements as loginPage } from '../POM/login_page'
// import { webElements as searchPage } from '../POM/search_page'

// describe('Handling iFrames', () => {

//     it('type into iframe', () => {
//         cy.log('********log into application **********');
//         cy.fixture('test-data').then(function (data) {
//             this.data = data;
//         cy.visit('/');
//         cy.xpath(homePage.navBar).click();
//         cy.log('********** sign into the application **********');
//         cy.xpath(homePage.navBar).click();
//         cy.xpath(homePage.signInBtn).click();
//         cy.xpath(loginPage.username).type(this.data.Username);
//         cy.xpath(loginPage.password).type(this.data.Password);
//         cy.xpath(loginPage.signInBtn).click();
//         cy.xpath(homePage.navBar).click();
//         cy.xpath(homePage.logOffBtn).contains('Log off').should('be.visible');

//         cy.log('********** navigate to search page **********');
//         cy.xpath(homePage.navBar).click();
//         cy.xpath(homePage.searchBtn).click();

//         cy.log('********** search for Test Monument **********');
//         cy.xpath(searchPage.searchBar).type('1628206{enter}');
//         cy.xpath(searchPage.testResult).click();

//         cy.log('********** verify record is displayed in the search results **********')
//         cy.xpath(searchPage.searchResult).should('be.visible');
//     })
// })
// })

//Example which does not work
//Working example - exaplanation (jquery object)


// https://www.cypress.io/blog/2020/02/12/working-with-iframes-in-cypress/
//https://www.w3schools.com/tags/tag_iframe.asp

import { webElems as element } from '../POM/DOM.js'
describe('Handling IFrames', function () {

    it('Type into IFrame',function(){
        cy.log('********** Log in **********');
        cy.visit('https://stage-warden.historicengland.org.uk/');
        console.log(element.expandNavBarBtn);
        cy.xpath(element.expandNavBarBtn).click();
        cy.xpath(element.loginSignInBtn).click();
        cy.xpath(element.usernameInput).type('EIyayi');
        cy.xpath(element.passwordInput).type('!?Eiyayi2020');
        cy.xpath(element.signInBtn).click();
    
        cy.log('********** Navigate to create historic associated monument record **********');
        cy.xpath(element.expandNavBarBtn).click();
        cy.xpath(element.manageDataBtn).invoke('removeAttr', 'target').click();
        cy.xpath(element.createHamResource).click({ force: true });
    
        cy.wait(5000);

        cy.xpath(`(//div[@class="resource-editor-tree"]/ul/li)[1]/ul/li/a/span[text()='Locations']/..`).click();
        cy.get('button').contains('Add').click().wait(1000);
        cy.xpath(`(//div[@class="resource-editor-tree"]/ul/li)[1]/ul/li/a/span[text()='Locations']/../../ul/div/li/ul/li/a/span[text()='Locational Descriptions']/..`)
        .click();

        cy.wait(3000);
        cy.get('iframe')
        .its('0.contentDocument')
        .its('body').type('We are testing IFrames here');
        cy.get('button').contains('Add').click().wait(2000);
    });


    // it('Type into IFrame with failure',function(){
    //     cy.log('********** Log in **********');
    //     cy.visit('https://stage-warden.historicengland.org.uk/');
    //     console.log(element.expandNavBarBtn);
    //     cy.xpath(element.expandNavBarBtn).click();
    //     cy.xpath(element.loginSignInBtn).click();
    //     cy.xpath(element.usernameInput).type('EIyayi');
    //     cy.xpath(element.passwordInput).type('!?Eiyayi2020');
    //     cy.xpath(element.signInBtn).click();
    
    //     cy.log('********** Navigate to create historic associated monument record **********');
    //     cy.xpath(element.expandNavBarBtn).click();
    //     cy.xpath(element.manageDataBtn).invoke('removeAttr', 'target').click();
    //     cy.get(element.createHamResource).click({ force: true });
    
    //     cy.wait(5000);

    //     cy.xpath(`(//div[@class="resource-editor-tree"]/ul/li)[1]/ul/li/a/span[text()='Locations']/..`).click();
    //     cy.get('button').contains('Add').click().wait(1000);
    //     cy.xpath(`(//div[@class="resource-editor-tree"]/ul/li)[1]/ul/li/a/span[text()='Locations']/../../ul/div/li/ul/li/a/span[text()='Locational Descriptions']/..`)
    //     .click();

    //     cy.wait(3000);
    //     cy.get('iframe').type('We are testing IFrames here');
    //     cy.get('button').contains('Add').click().wait(2000);
    // });
})