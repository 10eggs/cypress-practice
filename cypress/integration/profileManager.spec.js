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
        cy.xpath(homePage.navBar).click();
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
        cy.xpath(homePage.navBar).click();
        cy.xpath(homePage.welcomeBtn).click();
        cy.xpath(profilePage.editBtn).click();
        cy.xpath(profilePage.phoneNumField).type('0123456789');
        cy.xpath(profilePage.saveBtn).click();

        cy.log('********** verify phone number field contains updated number **********');
        cy.xpath(profilePage.phoneNumField).contains('0123456789').should('be.visible');
    })
})
/* fn: QHCFTZQ
// ln: 3FA7YN8@historicengland.org.uk
// e: tomasz.pawlak@historicengland.org.uk */