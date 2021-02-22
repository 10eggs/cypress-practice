/// <reference types="cypress" />

import { webElements as homePage } from '../POM/home_page'
import { webElements as resourceMngPage } from '../POM/resource_manager'

describe('User can create a new Monument record', () => {
    beforeEach(() => {
        Cypress.Cookies.preserveOnce('ai_session', 'csrftoken','warden','ai_user');
        cy.fixture('test-data').then(function (data) {
            this.data = data;
    })
})
    before(() => {
        cy.visit('/');
        cy.xpath(homePage.navBar).click();
        cy.xpath(homePage.manageDataBtn).invoke('removeAttr', 'target').click();
        cy.xpath(resourceMngPage.createResBtn).click();
        cy.url().contains(resourceMngPage.resourceId);
    })

    it('should be bale to add a record name', () => {
        cy.xpath(resourceMngPage.nameCard).click();
        cy.xpath(resourceMngPage.nameField).type('RW Test Monument');
        cy.xpath(resourceMngPage.nameTypeField).click();
        cy.xpath(resourceMngPage.primaryNameType).click();
        cy.xpath(resourceMngPage.addBtn).click();
        cy.xpath(resourceMngPage.hobUid).contains()
    })
})   