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
        action.selectCard('Primary Reference Number ');
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
        action.selectCard('Locations');
        action.selectNode('Locations', 'Related Areas').click();

        cy.log('********** verify the related areas are in the card tree **********')
        action.verifyNodeExists('Related Areas', ['Wiltshire']);
        action.verifyNodeExists('Related Areas', ['Avebury']);

    })

    /*************************************************************************************/

    it('@5 Location description data can be added to the record - handling iframe', () =>{
        action.selectNode('Locations', 'Locational Descriptions').click();
        action.selectFromDropDown('Location Description Type', 'Summary');

        cy.log('******** Interact with iframe ********')
        action.interactWithIframe('This is a test Monument located in Wiltshire.');

        cy.log('******** verfiy location description is visible in card tree ********')
        cy.wait(7000);
        action.verifyNodeExists('Locational Descriptions', ['Location Description Type', 'Summary']);
    })

    /*************************************************************************************/

    it('@6 Asset description can be added to the record', () => {
        cy.log('********** add a description to the record **********')
        action.selectCard('Asset Descriptions');
        action.selectFromDropDown('Asset_Description_Type', 'Summary');

        cy.log('******** interact with iframe ********')
        action.interactWithIframe('This is a test Monument record.');

        cy.log('********** verify asset description is visible in card tree ***********')
        action.verifyNodeExists('Asset Descriptions', ['Asset_Description', '[rich text]']);  
    })

    /*************************************************************************************/

    it('@7 Sources data can be added to the record', () => {
        cy.log('********** add sources data to the record **********')
        action.selectCard('Sources');
        action.typeIntoField('Source Number', '2');
        action.selectFromDropDown('Source or Source Type', 'The reconstruction of an Iron Age roundhouse at Castell Henllys, Dyfed');
        action.typeIntoField('Source Details', 'Test');
        action.typeIntoField('Page(s)', '2-11');
        action.typeIntoField('Figs.', '2');
        action.typeIntoField('Vol(s)', '3');
        cy.get('button').contains('Add').click();

        cy.log('********** verify sources data is visible in card tree **********')
        cy.wait(5000);
        action.verifyNodeExists('Sources', ['Source Number', '2']);
    })

    
    /*************************************************************************************/

    it('@8 Construction phase and type data can be added to the record', () => {
        cy.log('********** add construction data to the record **********')
        action.selectCard('Construction Phase and Type');
        //action.typeIntoDropDownField('Period', '21');
        action.selectFromDropDown('Period', '21st Century');
        action.typeIntoField('From Date', '2020-03-01');
        action.typeIntoField('To Date', '2020-04-02');
        //action.typeIntoDropDownField('Monument Type', 'Comm');
        action.selectFromDropDown('Monument Type', 'Community Centre');
        action.selectFromDropDown('Evidence', 'Implied Evidence');
        //action.typeIntoDropDownField('Main Construction Material', 'metal');
        action.selectFromDropDown('Main Construction Material', 'Metal');
        //action.typeIntoDropDownField('Construction Method', 'hand');
        action.selectFromDropDown('Construction Method', 'Handbuilt');
        action.typeIntoField('Construction Description', 'this is a test');
        action.selectFromDropDown('Construction Description Type', 'Summary');
        cy.get('button').contains('Add').click();

        cy.log('********* verify construction data is visible in card tree **********')
        cy.wait(5000);
        action.verifyNodeExists('Construction Phase and Type', ['Period', '21st Century']);
    })

    
    /*************************************************************************************/

    it('@9 Cross references to other datasets can be added to the record', () => {
        action.selectCard('Cross References to other datasets');
       // action.typeIntoDropDownField('External Cross Reference Source', 'Coll');
        action.selectFromDropDown('External Cross Reference Source', 'Collection Number');
        action.typeIntoField('External Cross Reference Number', '1234567890');
        action.typeIntoField('External Cross Reference Notes', 'this is a test.');
        cy.get('button').contains('Add').click();
        cy.wait(3000);

        cy.log('********** verify cross reference data is visible in card tree *********')
        cy.wait(5000);
        action.verifyNodeExists('Cross References to other datasets', ['External Cross Reference Source', 'Collection Number']);
    })

     
    /*************************************************************************************/

    it('@10 Related Warden Monuments can be added to the record', () => {
        action.selectCard('Related Warden Monuments');
        //action.typeIntoDropDownField('Associated_Monuments', '1628230');
        action.selectFromDropDown('Associated_Monuments', '1628330');
        action.selectFromDropDown('Relationship Type', 'General association');
        cy.get('button').contains('Add').click();

        cy.log('********** verify related warden monument data is visible in the card tree **********')
        cy.wait(5000);
        action.verifyNodeExists('Related Warden Monuments', ['Associated_Monuments', '1628230']);
    })

    /*************************************************************************************/

    it('@11 Associated Organisation data can be added to the record', () => {
        action.selectCard('Associated Organisations');
        //action.typeIntoField('Organisation', 'Historic');
        action.selectFromDropDown('Organisation', 'Historic England');
        action.selectFromDropDown('Organisation Role', 'Archaeological Field Investigator');
        action.selectFromDropDown('Organisation Role Date Precision', 'C');
        action.typeIntoField('Organisation Role From Date', '2021-03-18');
        action.typeIntoField('Organisation Role To Date', '2022-03-18');
        cy.get('button').contains('Add').click();

        cy.log('********** verify associated organisation data is visible in the card tree **********')
        cy.wait(5000);
        action.verifyNodeExists('Associated Organisations', ['Organisation', 'Historic England']);
    })

     /*************************************************************************************/

    it('@12 Associated People data can be added to the record', () => {
        action.selectCard('Associated People');
        //action.typeIntoDropDownField('Person', 'Helen');
        action.selectFromDropDown('Person', 'Helen Winton');
        cy.get('#select2-result-label-192 > div > div.selected-node-value > div > span.node-value-select-value').click();
        cy.get('#select2-chosen-174').contains('Historic England');
        action.selectFromDropDown('Person Role', 'Archaeological Field Investigator');
        action.typeIntoField('Person Role From Date', '2021-03-18');
        action.typeIntoField('Organisation Role To Date', '2022-03-18');
        action.selectFromDropDown('Person Role Date Precision', 'C');
        cy.get('button').contains('Add').click();

        cy.log('********** verify associated people data is visible in the card tree **********')
        cy.wait(5000);
        action.verifyNodeExists('Associated People', ['Person', 'Helen Winton']);
    })

     /*************************************************************************************/

    it('@13 Area status data can be added to the record', () => {
        action.selectCard('Area Status');
        action.selectFromDropDown('Area Status', 'Conservation Area');
        action.typeIntoField('From Date', '2021-03-18');
        action.typeIntoField('To Date', '2022-03-18');
        action.typeIntoField('Reference', 'this is a test');
        cy.get('button').contains('Add').click();

        cy.log('********** verify area status data is visible in the card tree **********')
        cy.wait(5000);
        action.verifyNodeExists('Area Status', ['Area Status', 'Conservation Area']);
    })

     /*************************************************************************************/

    it('@14 Related resources can be added to the record', () => {
        cy.xpath(createResourcePage.relatedResNode).click();
        cy.get('#s2id_autogen305 > ul').then(action.selectFromDropDown('Spec Pap Palaeontol'));
        cy.get('button').contains('Add').click();
    })

     /*************************************************************************************/

    it('The record can be deleted', () => {
        cy.get('.manage-dropdown').click();
        cy.get('#card-manager .menu-item-subtitle').click();

        cy.xpath('//*[@id="card-alert-panel"]/div[2]/button[2]').contains('Delete Resource?').click();

        cy.log('********** verify record has been successfully deleted **********')
        cy.url().should('eq', 'https://stage-warden.historicengland.org.uk/resource');
    })
    
});