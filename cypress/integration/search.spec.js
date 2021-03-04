/// <reference types="cypress" />

import { webElements as homePage } from '../POM/home_page'
import { webElements as searchPage } from '../POM/search_page'

describe('Search page functionality', function(){

    beforeEach(() => {
        Cypress.Cookies.preserveOnce('ai_session', 'csrftoken','warden','ai_user');
        cy.fixture('test-data').then(function (data) {
            this.data = data;
    })
})
    before(() => {
        cy.visit('/');
        cy.xpath(homePage.navBar).click();
        cy.xpath(homePage.searchBtn).click();

        cy.log('********** validate search page is displayed **********')
        cy.xpath(searchPage.searchBar).should('be.visible');
    })

    it('Users can carry out a basic search', function(){

        cy.log('********** Basic search for a single record **********');
        cy.get('#2id_autogen2').type('1509709{enter}').select('1509709', { force: true });


        // cy.log('********** verify record is displayed in the search results **********')
        // cy.xpath(searchPage.searchResult).should('be.visible');
    })

})
    
    