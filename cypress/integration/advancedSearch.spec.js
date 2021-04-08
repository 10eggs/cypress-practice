/// <reference types="cypress" />

import { webElements as homePage } from '../POM/home_page'
import { webElements as loginPage } from '../POM/login_page'
import { webElements as searchPage } from '../POM/search_page'

describe('advanced search functionality', () => {
    beforeEach(() => {
        Cypress.Cookies.preserveOnce('ai_session', 'csrftoken','warden','ai_user');
    })

    before(() => {
        /*
        *Did you pushed your last changes to the github? 
        *'test-data' doesn't exist in the fitures directory, that's why test fail.
        *
        */
        cy.fixture('example').then(function (data) {
            this.data = data;
        cy.visit('https://stage-warden.historicengland.org.uk/');
        cy.xpath(homePage.navBarToggle).click();
        cy.log('********** sign into the application **********');
        cy.xpath(homePage.signInBtn).click();
        cy.xpath(loginPage.username).type(this.data.name);
        cy.xpath(loginPage.password).type(this.data.password);
        cy.xpath(loginPage.signInBtn).click();
        cy.xpath(homePage.navBarToggle).click();
        cy.xpath(homePage.logOffBtn).contains('Log off').should('be.visible');
    })
})

    /*************************************************************************************/

    it('should navigate to the search page', () => {
        cy.log('********** navigate to search page **********')
        cy.xpath(homePage.navBarToggle).click();
        cy.xpath(homePage.searchBtn).click();
        cy.get('.select2-input').should('be.visible');
    })

     /*************************************************************************************/

    it('@1 should be able to search for a Monument with primary name type', () => {
        cy.log('********** select only monument resources **********')
        cy.xpath(searchPage.resourceTypeDD).click();
        cy.xpath(searchPage.monRsrc).click();

        cy.log('********** enter asset name into advanced search facet **********')
        cy.xpath(searchPage.advSearchBtn).click();
        cy.xpath(searchPage.monAssetName).click( { force: true });
        cy.xpath(searchPage.monNameField).type('test monument');

        cy.log('********** select the asset name type **********')
        cy.xpath(searchPage.assetNameDropDown).click();

        // Can't work out why it doesn't like any of the selectors for the asset name dropdown :(
        /*
        * I was struggling with this one as well! I'm not sure if it is a bug, but when you don't have a label above your ddl
        * then we can't talk about good ux. Second thing is drop down elements should by type of 'select' - but they aren't here.
        * Instead you have whole range of weird elements like anchors, divs etc. which are responsible for selecting from list (?).
        * My workaroud for this problem was clicking on small arrow attached to drop down list (it's a 'b' element), and next
        * clicking on required option. You can find this method in /POM/manage_data in our WardenRepo. Here is an example
        *   
            // selectFromDDL(ddlTitle,option){
            //     return cy.xpath(`//label[text()='${ddlTitle}']/../div/div/a/span/b`).click()
            //     .xpath(`//div[@class="select2-result-label" and text()='${option}']/..`).click();

        * Of course in this case this method is invalid, cause you don't have title for your DDL element, that's why I assume you'll
        * need to use hardcoded value to click on required arrow. Again, it's really, really bad to have ddls in this form,
        * cause when you are working with 'select' elements you can use cypress built-it method to select from list.
        */

        
        
        cy.get('#s2id_autogen312_search').type('Primary{enter}');
        cy.get('.select2-chosen').should('have.value', 'Primary');

        cy.log('********** verify the search result amount has decreased **********');
        cy.get('.search-listing-title').contains('1358845');
    })

    // it('@2 should be able to search for a monument using latitude and longitude coordinates', () => {


    // })

})

