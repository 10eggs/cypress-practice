/// <reference types="cypress" />
import { webElements as loginPage } from '../POM/login_page'
import { webElements as homePage } from '../POM/home_page'

describe('Login functionality', () => {

    beforeEach(() => {
        Cypress.Cookies.preserveOnce('ai_session', 'csrftoken','warden','ai_user');
    })

    before(() => {
        cy.visit('/');
    })

    it('navigates to the sign in page', () => {
        cy.xpath(homePage.navBarToggle).click({ force: true });
        cy.xpath(homePage.signInBtn).click();
        cy.url().should('eq', 'https://stage-warden.historicengland.org.uk/auth/?next=/index.htm');
    })

    it('displays an error message when logging in with invalid credentials', () => {
        cy.xpath(loginPage.username).type('test');
        cy.xpath(loginPage.password).type('test');
        cy.get('button').contains('Sign In').click();

        cy.get('#login-failed-alert').should('be.visible').and('contain', 'Login failed');
    })

    it('can login using valid credentials', () => {
        cy.fixture('example').then(function (data) {
            this.data = data;
        cy.xpath(loginPage.username).clear().type(this.data.name);
        cy.xpath(loginPage.password).clear().type(this.data.password);
        cy.get('button').contains('Sign In').click();
        });

        cy.xpath(homePage.navBarToggle).click({ force: true });
        cy.get('.application-login').should('contain', 'Log off');
        //cy.getCookie('cypress-session-cookie').should('exist');
    })

});