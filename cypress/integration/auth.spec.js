/// <reference types="cypress" />
import { webElements as homePage } from '../POM/home_page'
import { webElements as loginPage } from '../POM/login_page'

describe('Authentication functionality', () => {
    beforeEach(() => {
        Cypress.Cookies.preserveOnce('ai_session', 'csrftoken','warden','ai_user'); 
        cy.visit('/');   
})


    it('User can login using valid credentials', () => {
        cy.log('********** sign into the application **********');
        cy.fixture('test-data').then(function (data) {
            this.data = data;
        cy.xpath(homePage.navBar).click();
        cy.xpath(homePage.signInBtn).click();
        cy.xpath(loginPage.username).type(this.data.Username);
        cy.xpath(loginPage.password).type(this.data.Password);
        cy.xpath(loginPage.signInBtn).click();
        cy.xpath(homePage.navBar).click();

        cy.log('********** verify user is logged in **********')
        cy.xpath(homePage.logOffBtn).contains('Log off').should('be.visible');
        cy.xpath(homePage.logOffBtn).click();
    })

  })

    it('User cannot login using invalid credentials', () =>{
        cy.xpath(homePage.navBar).click();
        cy.xpath(homePage.signInBtn).click();
        cy.xpath(loginPage.username).type('test');
        cy.xpath(loginPage.password).type('test');
        cy.xpath(loginPage.signInBtn).click();

        cy.log('********** verify error message is visible **********')
        cy.get('login-failed-alert').should('be.visible');
    })

})