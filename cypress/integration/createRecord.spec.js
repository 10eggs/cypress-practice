/// <reference types="cypress" />

import { webElements as homePage } from '../POM/home_page'
import { webElements as loginPage } from '../POM/login_page'
import { webElements as resourceMngPage } from '../POM/resource_manager'
import { webElements as createResourcePage } from '../POM/create_record_page'
import CreateResourcePage from '../POM/create_record_page'

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

    /*************************************************************************************/

    it('Asset name can be assigned to a Monument record', () => {
        action.selectCard('Asset Name');
        action.typeIntoField('Name', 'Test Monument');
        action.selectFromDropDown('Name Type', 'Primary');
        cy.xpath(createResourcePage.addBtn).click();

        cy.log('********** verify the new node is visible in the tree **********')
        action.verifyNodeExists('Asset Name', ['Name', 'Test Monument']);
    })

    /*************************************************************************************/

    it('Verify Hobuid has been autopopulated', () => {
        cy.log('********** verify the hobuid is now the record title **********')
        action.selectCard('Primary Reference Number ')
        action.getTextFromInput('HobUid').then($val=>{
            cy.get('.page-header').find('span').invoke('text').should('contain', $val);
        })
    })

    /*************************************************************************************/

    it('Location data can be added to the record', () => {
        cy.log('********** click on the Locations card and add a new locations instance **********')
        action.selectCard('Locations');
        cy.get('button').contains('Add').click();

        // cy.log('********** add map location data **********')
        // action.selectNode('Locations', 'Map').click();
        // cy.get('.mapboxgl-ctrl-geocoder--input').type('Andover');
        // cy.get('.mapboxgl-ctrl-geocoder--suggestion').first().click();

        cy.log('********** add grid reference in map refrence node **********')
        action.selectNode('Locations', 'Map References').click();
        cy.get('[placeholder="Enter the centre point map reference of the resource."]').type('SU1025169962');
        cy.get('button').contains('Add').click();
        action.verifyNodeExists('Map References', ['OSGB Grid Reference: SU1025169962']);

        cy.log('*********** add an invalid grid reference and verify error message displays **********')
        cy.get('[placeholder="Enter the centre point map reference of the resource."]').type('123456680');
        cy.get('[data-bind="text: errorMessage"]').should('be.visible');


    })


})   