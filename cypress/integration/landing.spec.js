/// <reference types="cypress"/>
import { webElements as homePage } from "../POM/home_page";
import { webElements as loginPage } from "../POM/login_page";
import { webElements as searchPage } from "../POM/search_page";
import { webElements as resManagerPage } from "../POM/resource_manager";        

describe('Landing page functionalities', () => {

    beforeEach(() => {
        Cypress.Cookies.preserveOnce('ai_session', 'csrftoken','warden','ai_user');
    })
})

    it('clicking Search takes user to the search page', () => {
        cy.fixture('test-data').then(function (data) {
            this.data = data
        cy.visit('/');
        cy.xpath(homePage.navBar).click();
        cy.xpath(homePage.signInBtn).click();
        cy.xpath(loginPage.username).type(this.data.Username);
        cy.xpath(loginPage.password).type(this.data.Password);
        cy.xpath(loginPage.signInBtn).click();
        cy.xpath(homePage.navBar).click();
        cy.xpath(homePage.logOffBtn).contains('Log off').should('be.visible');

        cy.log('********* Test navigation to search page **********')
        cy.xpath(homePage.searchBtn).click();
        cy.xpath(searchPage.searchBar).should('be.visible');
    })

    it('clicking Manage Data takes user to the Resource Manager', () => {
        cy.log('********* Test navigation to Resource Manager **********')
        cy.visit('/');
        cy.xpath(homePage.navBar).click();
        cy.xpath(homePage.manageDataBtn).invoke('removeAttr', 'target').click();

        cy.log('********* verify url **********')
        cy.url().should('eq', 'http://stage-warden.historicengland.org.uk/resource');
    })

    it('clicking Welcome takes user to the Profile Manager page', () => {
        cy.log('********* Test navigation to Profile Manager **********')
        cy.visit('/');
        cy.xpath(homePage.navBar).click();
        cy.xpath(homePage.welcomeBtn).click();

        cy.log('********* verify url **********')
        cy.url().should('eq', 'https://stage-warden.historicengland.org.uk/user');
    })

})