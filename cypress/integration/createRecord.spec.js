/// <reference types="cypress" />

import { webElements as homePage } from '../POM/home_page'
import { webElements as loginPage } from '../POM/login_page'
import { webElements as resourceMngPage } from '../POM/resource_manager'
import { webElements as createResourcePage } from '../POM/create_resource_page'
import CreateResourcePage from '../POM/create_resource_page'

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
        cy.wait(1000);
        cy.get(createResourcePage.resourceTree).should('be.visible');
    })
})

    /*************************************************************************************/

    it('@1 Asset name can be assigned to a Monument record', () => {
        action.selectCard('Asset Name');
        action.typeIntoField('Name', 'Test Monument');
        action.selectFromDropDown('Name Type', 'Primary');
        cy.xpath(createResourcePage.addBtn).click();
        cy.wait(1000);

        cy.log('********** verify the new node is visible in the tree **********')
        action.verifyNodeExists('Asset Name', ['Name', 'Test Monument']);
    })

    /*************************************************************************************/

    it('@2 Verify Hobuid has been autopopulated', () => {
        cy.log('********** verify the hobuid is now the record title **********')
        action.selectCard('Primary Reference Number ')
        action.getTextFromInput('HobUid').then($val=>{
            cy.get('.page-header').find('span').invoke('text').should('contain', $val);
        })
    })

    /*************************************************************************************/

    it('@3 Location data can be added to the record', () => {
        cy.log('********** click on the Locations card and add a new locations instance **********')
        action.selectCard('Locations');
        cy.get('button').contains('Add').click();
        cy.wait(1000);

        // cy.log('********** add map location data **********')
        // action.selectNode('Locations', 'Map').click();
        // cy.get('.mapboxgl-ctrl-geocoder--input').type('Andover');
        // cy.get('.mapboxgl-ctrl-geocoder--suggestion').first().click();

        cy.log('*********** add an invalid grid reference and verify error message displays **********')
        action.selectNode('Locations', 'Map References').click();
        cy.get('[placeholder="Enter the centre point map reference of the resource."]').type('123456680');
        cy.get('button').contains('Add').click();
        cy.get('.widget-wrapper').find('[data-bind="text: errorMessage"]').invoke('text')
        .should('eq', 'Input coordinate did not pass validation.  Please check it is in one of the approved formats and try again.');

        cy.log('********** add a valid grid reference in map refrence node **********')
        cy.get('[placeholder="Enter the centre point map reference of the resource."]').clear().type('SU1025169962');
        cy.get('button').contains('Add').click();
        cy.wait(5000);

        cy.log('********** verify the coordinate has been added and is visible in the map references node **********')
        action.verifyNodeExists('Map References', ['OSGB Grid Reference', 'SU1025169962']);
    })

    /*************************************************************************************/

    it('@4 Related areas should be auto populated with the correct locations', () => {
        cy.reload().wait(7000);
        action.selectCard('Locations').click();
        action.selectNode('Locations', 'Related Areas').click();

        cy.log('********** verify the related areas are in the card tree **********')
        action.verifyNodeExists('Related Areas', ['Wiltshire']);
        action.verifyNodeExists('Related Areas', ['Avebury']);

    //     cy.get('#main-content > div > div > div.left-panel.graph-designer.resource-editor > div > div.resource-editor-tree > ul > li:nth-child(1) > ul > li.jstree-node.jstree-open > ul > div > li > ul > li:nth-child(3) > ul > div > li:nth-child(1) > a').click();
    //     cy.get('.card-component .form-control').contains('Avebury');
    //     cy.get('.select2-choice').find('select2-chosen-6').contains('Civil Parish');


    //     cy.get('#main-content > div > div > div.left-panel.graph-designer.resource-editor > div > div.resource-editor-tree > ul > li:nth-child(1) > ul > li.jstree-node.jstree-open > ul > div > li > ul > li:nth-child(3) > ul > div > li:nth-child(1) > a').click();
    //     cy.get('.card-component .form-control').invoke('text').contains('Wiltshire');
    //     cy.get('.select2-choice').find('select2-chosen-6').contains('District');
    // })

    /*************************************************************************************/

    it('@5 Asset description can be added to the record', () => {
        cy.log('********** add a description to the record **********')
        action.selectCard('Asset Descriptions').click();
        action.selectFromDropDown('Location Description Type', 'Summary');
        action.typeIntoField('Location Description', 'this is a test record.');
        cy.get(resourceMngPage.addBtn).click();

        cy.log('********** verify asset description is visible in card tree ***********')
        action.verifyNodeExists('Asset Description', ['this is a test record.']);  
    })

    /*************************************************************************************/

    it('@6 Sources data can be added to the record', () => {
        cy.log('********** add sources data to the record **********')
        action.selectCard('Sources').click();
        action.typeIntoField('Source Number', '2');
        action.selectFromDropDown('Source or Source Type', 'The reconstruction of an Iron Age roundhouse at Castell Henllys, Dyfed');
        action.typeIntoField('Source Details', 'Test');
        action.typeIntoField('Page(s)', '2-11');
        action.typeIntoField('Figs.', '2');
        action.typeIntoField('Vol(s)', '3');
        cy.get(createResourcePage.addBtn).click();

        cy.log('********** verify sources data is visible in card tree **********')
        action.verifyNodeExists('Source Number', ['this is a test']);
    })

    
    /*************************************************************************************/

    it('@7 Construction phase and type data can be added to the record', () => {
        cy.log('********** add construction data to the record **********')
        action.selectCard('Construction Phase and Type').click();
        action.typeIntoField('Period', '21');
        action.selectFromDropDown('Period', '21st Century');
        action.typeIntoField('From Date', '2020-03-01');
        action.typeIntoField('To Date', '2020-04-02');
        action.typeIntoField('Monument Type', 'Comm');
        action.selectFromDropDown('Monument Type', 'Community Centre');
        action.selectFromDropDown('Evidence', 'Implied Evidence');
        action.typeIntoField('Main Construction Material', 'metal');
        action.selectFromDropDown('Main Construction Material', 'Metal');
        action.typeIntoField('Construction Method', 'hand');
        action.selectFromDropDown('Construction Method', 'Handbuilt');
        action.typeIntoField('Construction Description', 'this is a test');
        action.selectFromDropDown('Construction Description Type', 'Summary');

        cy.log('********* verify construction data is visible in card tree **********')
        cy.verifyNodeExists('Construction Phase and Type', ['Period', '21st Century']);
    })

    
    /*************************************************************************************/

})
})