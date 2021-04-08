class HomePage {

}

/*
* I am very glad that you are using xpaths instead of css selectors :)!
* Few tips here:
* 1. Try to avoid asteriks '*' mark. Let's say element you search is type of div, and number of all elements on the page is 8000.
* When you use '//*' instead of '//div' searching engine perform searching process for all 8k elements, and if you decide to use '//div'
* then searching process start only for elements which are 'div' type. Of course sometimes using '*' is much more convenient, but we should try to avoid it.

* 2. Rather than using array index '[numberOfElement]' try to use attributes. It makes your repo more readable. Try to imagine situation, when
* your repo has 200 elements - good naming convention would be essential, but even if your names are selected wisely, it's good to have another element
* which can improve tracebility - and it would be good-looking xpaths. By using attributes values you can associate xpaths with DOM elements 
* from your site much quicker. As I mentioned abouve - it also depends on context, sometimes there is much easier to use array index, so as usually -
* it's all about context :P.
*
*
*/
const webElements = {
    navBarToggle: '//button[@class="navbar-toggle"]',
    signInBtn: '//*[@id="auth-link"]',
    logOffBtn: '//*[@id="myNavbar"]/ul/li[5]/a',
    searchBtn: '//*[@id="myNavbar"]/ul/li[2]/a',
    manageDataBtn: '//*[@id="myNavbar"]/ul/li[3]/a',
    welcomeBtn: '//*[@id="myNavbar"]/ul/li[4]/a'
};

export {webElements};