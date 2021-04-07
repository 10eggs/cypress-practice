/// <reference types="cypress" />
import { webElements as homePage } from '../POM/home_page';
import { webElements as loginPage } from '../POM/login_page';
import { webElements as profilePage } from '../POM/profile_page';

describe('Editing user profile', () => {

    beforeEach(() => {
        cy.log("********** Before every scenario use existing auth token **********");
        Cypress.Cookies.preserveOnce('ai_session', 'csrftoken','warden','ai_user');
    })

    before(() => {
        cy.visit('/');
        cy.log('********** Login to Warden using valid credentials **********');
        cy.xpath(homePage.navBarToggle).click();
        cy.xpath(homePage.signInBtn).click();
        cy.fixture('test-data').then(function (data) {
            this.data = data;
        cy.xpath(loginPage.username).type(this.data.Username);
        cy.xpath(loginPage.password).type(this.data.Password);
        cy.xpath(loginPage.signInBtn).click();
    })
})

    it('should update phone number', () => {
        cy.visit('/');

        cy.log('********** Change phone number **********')
        cy.xpath(homePage.navBarToggle).click();
        cy.xpath(homePage.welcomeBtn).click();
        cy.xpath(profilePage.editBtn).click();
        cy.xpath(profilePage.phoneNumField).clear().type('0123456789');
        cy.xpath(profilePage.saveBtn).click();

        // find out how to assert input text exists - use have.value
        cy.log('********** verify phone number field contains updated number **********');
        cy.xpath(profilePage.phoneNumField).should('have.value', '0123456789');
    })

    it('should change first name and change it back', () => {
        cy.visit('/');

        cy.xpath(homePage.navBarToggle).click();
        cy.xpath(homePage.welcomeBtn).click();
        cy.xpath(profilePage.editBtn).click();

        cy.log('********** change first name and verify change **********')
        cy.xpath(profilePage.firstName).clear().type('rebecca');
        cy.xpath(profilePage.saveBtn).click();
        cy.xpath(profilePage.firstName).should('have.value', 'rebecca');

        cy.log('********** change name back and verify change **********')
        cy.xpath(profilePage.editBtn).click();
        cy.xpath(profilePage.firstName).clear().type('QHCFTZQ');
        cy.xpath(profilePage.saveBtn).click();
        cy.xpath(profilePage.firstName).should('have.value', 'QHCFTZQ');
    })
})


// fn: QHCFTZQ