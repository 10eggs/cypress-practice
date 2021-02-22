/// <reference types="cypress" />

import { webElements as homePage } from '../POM/home_page'
import { webElements as loginPage } from '../POM/login_page'
import { webElements as resourceMngPage } from '../POM/resource_manager'

describe('User can create a new Monument record', () => {
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

        cy.log('********** navigate to create resource page **********')
        cy.xpath(homePage.manageDataBtn).invoke('removeAttr', 'target').click();
        cy.xpath(resourceMngPage.createResBtn).click();
        //cy.url().contains(resourceMngPage.resourceId);
    })
})

    it('should be bale to add a record name', () => {
        cy.xpath(resourceMngPage.nameCard).click();
        cy.xpath(resourceMngPage.nameField).type('RW Test Monument');
        cy.xpath(resourceMngPage.nameTypeField).click();
        cy.xpath(resourceMngPage.primaryNameType).click();
        cy.xpath(resourceMngPage.addBtn).click();
        //cy.xpath(resourceMngPage.hobUid).contains()
    })
})   