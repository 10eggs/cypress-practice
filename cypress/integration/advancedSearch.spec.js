/// <reference types="cypress" />

import { webElements as homePage } from '../POM/home_page'
import { webElements as loginPage } from '../POM/login_page'
import { webElements as searchPage } from '../POM/search_page'

describe('advanced search functionality', () => {
    beforeEach(() => {
        Cypress.Cookies.preserveOnce('ai_session', 'csrftoken','warden','ai_user');
    })

    before(() => {
        cy.fixture('test-data').then(function (data) {
            this.data = data;
        cy.visit('/');
        cy.xpath(homePage.navBar).click();
        cy.log('********** sign into the application **********');
        cy.xpath(homePage.navBar).click();
        cy.xpath(homePage.signInBtn).click();
        cy.xpath(loginPage.username).type(this.data.Username);
        cy.xpath(loginPage.password).type(this.data.Password);
        cy.xpath(loginPage.signInBtn).click();
        cy.xpath(homePage.navBar).click();
        cy.xpath(homePage.logOffBtn).contains('Log off').should('be.visible');
    })
})

    /*************************************************************************************/

    it('should navigate to the search page', () => {
        cy.log('********** navigate to search page **********')
        cy.xpath(homePage.navBar).click();
        cy.xpath(homePage.searchBtn).click();
        cy.get('.select2-input').should('be.visible');
    })

     /*************************************************************************************/

    it('@1 should be able to search for a Monument with primary name type', () => {
        cy.log('********** select only monument resources **********')
        cy.xpath(searchPage.rsrcType).click();
        cy.xpath(searchPage.monRsrc).click();

        cy.log('********** enter asset name into advanced search facet **********')
        cy.xpath(searchPage.advSearchBtn).click();
        cy.xpath(searchPage.monAssetName).click( { force: true });
        cy.xpath(searchPage.monNameField).type('test monument');

        cy.log('********** select the asset name type **********')
        cy.xpath(searchPage.assetNameDropDown).click();

        // Can't work out why it doesn't like any of the selectors for the asset name dropdown :(
        cy.get('#s2id_autogen312_search').type('Primary{enter}');
        cy.get('.select2-chosen').should('have.value', 'Primary');

        cy.log('********** verify the search result amount has decreased **********');
        cy.get('.search-listing-title').contains('1358845');
    })

    // it('@2 should be able to search for a monument using latitude and longitude coordinates', () => {


    // })

})