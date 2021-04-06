/// <reference types="cypress" />
import { webElements as loginPage } from '../POM/login_page'

describe('Login functionality', () => {

    beforeEach(() => {
        Cypress.Cookies.preserveOnce('ai_session', 'csrftoken','warden','ai_user');
    })

    before(() => {
        cy.visit('/');
        cy.fixture('test-data').then(function (data) {
            this.data = data;
        });
    })

    it('navigates to the sign in page', () => {
        cy.xpath('//button[@class="navbar-toggle"]').click({ force: true });
        cy.xpath('//*[@id="auth-link"]').click();
        cy.url().should('eq', 'https://stage-warden.historicengland.org.uk/auth/?next=/index.htm');
    })

    it('displays an error message when logging in with invalid credentials', () => {
        cy.xpath(loginPage.username).type('test');
        cy.xpath(loginPage.password).type('test');
        cy.get('button').contains('Sign In').click();

        cy.get('#login-failed-alert').should('be.visible').and('contain', 'Login failed');
    })

    it('can login using valid credentials', () => {
        cy.get(loginPage.username).clear().type(this.data.Username);
        cy.get(loginPage.password).clear().type(this.data.Password);
        cy.get('button').contains('Sign In').click();

        cy.get('[data-target=#myNavbar]').click();
        cy.get('.application-login').should('contain', 'Log off');
        cy.getCookie('cypress-session-cookie').should('exist');
    })

});