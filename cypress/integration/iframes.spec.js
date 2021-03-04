/// <reference types="cypress" />

import { webElements as homePage } from '../POM/home_page'
import { webElements as loginPage } from '../POM/login_page'
import { webElements as searchPage } from '../POM/search_page'

describe('Handling iFrames', () => {

    it('type into iframe', () => {
        cy.log('********log into application **********');
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

        cy.log('********** navigate to search page **********');
        cy.xpath(homePage.navBar).click();
        cy.xpath(homePage.searchBtn).click();

        cy.log('********** search for Test Monument **********');
        cy.xpath(searchPage.searchBar).type('1628206{enter}');
        cy.xpath(searchPage.testResult).click();

        cy.log('********** verify record is displayed in the search results **********')
        cy.xpath(searchPage.searchResult).should('be.visible');
    })
})
})