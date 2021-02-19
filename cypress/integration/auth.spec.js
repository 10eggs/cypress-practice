/// <reference types="cypress" />
import { webElements as homePage } from '../POM/home_page'
import { webElements as loginPage } from '../POM/login_page'

describe('Login to Warden as an existing user', function(){

    it('Login to Warden', function(){

        cy.log('********** Navigate to warden website **********');
        cy.visit('/');
        cy.xpath(homePage.navBar).click();
        cy.xpath(homePage.signInBtn).click();

        cy.log('********** Login to Warden using valid credentials **********');
        cy.fixture('test-data').then(function (data) {
            this.data = data;
        cy.xpath(loginPage.username).type(this.data.Username);
        cy.xpath(loginPage.password).type(this.data.Password);
        cy.xpath(loginPage.signInBtn).click();

        cy.log('********** Validate login was successful **********')
        cy.xpath(homePage.navBar).click();
        cy.xpath(homePage.logOffBtn).contains('Log off').should('be.visible');
    })
  })
})