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

        cy.log('********** navigate to search page **********')
        cy.xpath(homePage.navBar).click();
        cy.xpath(homePage.searchBtn).click();
        cy.get('#s2id_autogen2').should('be.visible');
    })
})

    /*************************************************************************************/

    it('@1 should be able to search for a Monument with primary name type like test monument', () => {
        cy.log('********** select only monument resources **********')
        cy.xpath(searchPage.rsrcType).click();
        cy.xpath(searchPage.monRsrc).click();

        cy.xpath(searchPage.advSearchBtn).click();
        cy.xpath(searchPage.monAssetName).click( { force: true });
        cy.xpath(searchPage.monNameField).type('test monument');
        cy.xpath(searchPage.dropDown).click();
        cy.xpath(searchPage.nameEq).click();

        cy.log('********** verify the search result amount has decreased **********');
        cy.get('.search-title').contains('Results: 572');
    })

    // it('@2 should be able to search for a monument using latitude and longitude coordinates', () => {


    // })

})