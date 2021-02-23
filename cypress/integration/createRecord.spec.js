/// <reference types="cypress" />

import { webElements as homePage } from '../POM/home_page'
import { webElements as loginPage } from '../POM/login_page'
import { webElements as resourceMngPage } from '../POM/resource_manager'
import { webElements as createResourcePage } from '../POM/create_record_page'

const action = new CreateResourcePage();

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
        cy.get(createResourcePage.resourceTree).should('be.visible');
    })
})

    it('Asset name can be assigned to a Monument record', () => {
        action.selectCard('Asset Name');
        action.typeIntoField('Name', 'Test Monument');
        action.selectNode('Name Type', 'Primary');
        cy.xpath(createResourcePage.addBtn).click();

        
    })
})   