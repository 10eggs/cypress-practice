/// <reference types="cypress" />

describe('Login functionality', () => {

    beforeEach(() => {
        cy.visit('/');
        cy.fixture('test-data').then(function (data) {
            this.data = data;
        })
    })

    it('navigates to the sign in page', () => {
        cy.xpath('//button[@class="navbar-toggle"]').click({ force: true });
        cy.xpath('//*[@id="auth-link"]').click();
        cy.url().should('eq', 'https://stage-warden.historicengland.org.uk/auth/?next=/index.htm');
    })

    it('displays an error message when logging in with invalid credentials', () => {
        cy.get('input[name=username]').type('test');
        cy.get('input[name=password]').type('test');
        cy.get('button[type=submit]').click();

        cy.get('login-failed-alert').should('be.visible').and('contain', 'Login failed');
    })

    it('can login using valid credentials', () => {
        cy.get('input[name=username]').clear().type(this.data.Username);
        cy.get('input[name=password]').clear().type(this.data.Password);
        cy.get('button[type=submit]').click();

        cy.get('[data-target=#myNavbar]').click();
        cy.get('.application-login').should('contain', 'Log off');
        cy.getCookie('cypress-session-cookie').should('exist');
    })

})