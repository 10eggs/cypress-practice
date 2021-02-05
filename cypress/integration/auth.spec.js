/// <reference types="cypress" />
import { webElements as homePage } from '../POM/home_page'
import { webElements as loginPage } from '../POM/login_page'

describe('Login to Warden as an existing user', function(){

    beforeEach(() => {
        cy.log("********** Before every scenario use existing auth token **********");
        Cypress.Cookies.preserveOnce('ai_session', 'csrftoken','warden','ai_user');
        cy.fixture('test-data').then(function (data) {
            this.data = data;
        })

    }) 
    
    it('Login to Warden', function(){

        cy.log('********** Navigate to warden website **********');
        cy.visit('https://stage-warden.historicengland.org.uk/');
        cy.xpath(homePage.navBar).click();
        cy.xpath(homePage.signInBtn).click();

        cy.log('********** Login to Warden using valid credentials **********');
        cy.xpath(loginPage.username).type(this.data.Username);
        cy.xpath(loginPage.password).type(this.data.Password);
        cy.xpath(loginPage.signInBtn).click();

        cy.log('********** Validate login was successful **********')
        cy.xpath(homePage.navBar).click();
        cy.xpath(homePage.logOffBtn).contains('Log off').should('be.visible');
    })
  })