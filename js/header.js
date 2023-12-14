const navLinkAportante = document.getElementById('aportante-nav');
const navLinkBill = document.getElementById('bill-nav');

const aportantePage = document.getElementById('aportante-container');
const billPage = document.getElementById('bill-container');


document.addEventListener('DOMContentLoaded', () => {
    addNavEventListeners();
})


function addNavEventListeners(){

    [navLinkBill,navLinkAportante].forEach( (link) => {

        link.addEventListener("click", (e) => {
            e.preventDefault();
            activateNavLink(link);
            makeVisible(link.id);
        })
    })


}

function activateNavLink( element ){
    // const element = document.getElementById('bill-nav');

    const navContainer = document.getElementById('nav-container');
    let elements = navContainer.children;
    let keys = Object.keys(elements);
    
    keys.forEach( key => {
        elements[key].classList.remove('active');
    });
    
    element.classList.add('active');

}

function makeVisible( tab ){
    
    [aportantePage, billPage].forEach( (element) => {
        element.classList.remove('visible');
        element.classList.add('hidden');
    })

    switch (tab) {
        case 'aportante-nav':
            aportantePage.classList.remove('hidden');
            aportantePage.classList.add('visible');
            break;
        case 'bill-nav':
            billPage.classList.remove('hidden');
            billPage.classList.add('visible');
            break;
    
        default:
            element.classList.remove('hidden');
            aportantePage.classList.add('visible');
            break;
    }
}

export {
    makeVisible,
    activateNavLink,
}