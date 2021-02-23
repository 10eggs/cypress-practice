class CreateResourcePage {

    constructor(){
    }

    selectCard(leaf){
        return cy.xpath(`(//div[@class="resource-editor-tree"]/ul/li)[1]/ul/li/a/span[text()='${leaf}']/..`).click();
    }

    selectNode(leaf, node){
        return cy.xpath(`(//div[@class="resource-editor-tree"]/ul/li)[1]/ul/li/a/span[text()='${leaf}']/../../ul/div/li/ul/li/a/span[text()='${node}']/..`);
    }

    typeIntoField(field, text){
        return cy.xpath(`//label[text()='${field}']/../div/input`).clear().type(`${text}`);
    }

    selectFromDropDown(field, option){
        return cy.xpath(`//label[text()='${field}']/../div/div/a/span/b`).click().xpath(`//div[@class="select2-result-label" and text()='${option}']/..`).click();
    }

    verifyNodeExists(leaf, newNode){
        return cy.get('a.jstree-anchor').contains(`${leaf}`).parent().parent().children('ul.jstree-children').within($el=>{
            for(let i=0;i<newNode.length;i++){
                cy.get('span').contains(`${newNode[i]}`).should('be.visible');
            }
        })
    }

}

const webElements = {
    resourceTree: '.resource-editor-tree',

    nameCard: '//*[@id="main-content"]/div/div/div[1]/div/div[2]/ul/li[1]/ul/li[4]/a/i[2]',
    nameField: '//*[@id="main-content"]/div/div/div[3]/div[2]/div/div/div/form/div/div[1]/div/div/div/input',
    nameTypeField: '//*[@id="s2id_autogen1"]/a',
    primaryNameType: '//*[@id="select2-chosen-36"]/ul/li[1]',
    addBtn: '//*[@id="main-content"]/div/div/div[3]/div[2]/div/div/div/div/button[2]',
    hobUid: '//*[@id="content-container"]/header/div[1]/div[1]/div[2]/h1/span',

    parentMonCard: '//*[@id="main-content"]/div/div/div[1]/div/div[2]/ul/li[1]/ul/li[3]/a/span',
    parentMonField: '//*[@id="s2id_autogen3"]/a',
    pmHobUidSelect: '//*[@id="s2id_autogen3"]/label',
    //addBtn: '//*[@id="main-content"]/div/div/div[3]/div[2]/div/div/div/div/button[2]',

    primaryRefNumCard: '//*[@id="main-content"]/div/div/div[1]/div/div[2]/ul/li[1]/ul/li[2]/a/span',
    hobUidField: '//*[@id="main-content"]/div/div/div[3]/div[2]/div/div/div/form/div/div[1]/div/div/div/input',
    resourceId: '//*[@id="main-content"]/div/div/div[3]/div[2]/div/div/div/form/div/div[2]/div/div/div/input',
}

export {webElements};
export default CreateResourcePage;