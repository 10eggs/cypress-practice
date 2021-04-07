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
        cy.get('.search-attribute-widget').should('be.visible');
    })

    it('Users can carry out a basic search', function(){
        cy.log('********** Basic search for a single record **********');
        cy.get('.resource_search_widget:nth-child(1)').type('1509709{enter}');
        cy.get('#select2-result-label-5').click();

        cy.log('********** verify record is displayed in the search results **********')
        cy.get('.search-listing:nth-child(1)').should('be.visible');
    })

    it('can search for only monument records using the resource type filter', () => {
        cy.log('********** select monuments from the resource type drop down **********')
        cy.xpath(searchPage.searchResultsHeader).should('be.visible').then($result=> {
            let num = $result.text();
            cy.log('Number of results: ',num);


        cy.xpath(searchPage.resourceTypeDD).click();
        cy.get(':nth-child(7) > a').click();
        cy.xpath(searchPage.searchResultsHeader).invoke('text').should('not.eq',num);
        })
    })


})
