//-------------------- aside menu function---------------------------------------

const backButton = document.querySelector('.back');
const menuItemInner = document.querySelector('.menu-item-inner');
const aboutBoardMenu = document.querySelector('#aboutBoard-menu');
const labelsBoardMenu = document.querySelector('#labelsBoard-menu');
const settingsBoardMenu = document.querySelector('#settingsBoard-menu');
const activityBoardMenu = document.querySelector('#activityBoard-menu');
const offcanvasCloseBtn = document.querySelector('#offcanvas-close');

const hideMenus = () => {
    menuItemInner.classList.add('d-none');
    aboutBoardMenu.classList.add('d-none');
    labelsBoardMenu.classList.add('d-none');
    settingsBoardMenu.classList.add('d-none');
    activityBoardMenu.classList.add('d-none');
}

offcanvasCloseBtn.addEventListener('click', hideMenus);
backButton.addEventListener('click', hideMenus);


const toggleMenu = (menuElement, menuId) => {
    menuItemInner.classList.remove('d-none');
    menuElement.classList.remove('d-none');
}

document.querySelector('#aboutBoard').addEventListener('click', () => toggleMenu(aboutBoardMenu));
document.querySelector('#labelsBoard').addEventListener('click', () => toggleMenu(labelsBoardMenu));
document.querySelector('#settingsBoard').addEventListener('click', () => toggleMenu(settingsBoardMenu));
document.querySelector('#activityBoard').addEventListener('click', () => toggleMenu(activityBoardMenu));


//-------------------- close dropdown function---------------------------------------

document.addEventListener('DOMContentLoaded', function () {
    const dropdowns = document.querySelectorAll('[data-bs-toggle="dropdown"]');

    dropdowns.forEach(dropdownToggle => {
        const bootstrapDropdown = bootstrap.Dropdown.getInstance(dropdownToggle) || new bootstrap.Dropdown(dropdownToggle);

        const dropdownMenu = dropdownToggle.nextElementSibling;
        if (dropdownMenu) {
            const closeButton = dropdownMenu.querySelector('[aria-label="Close popover"]');

            if (closeButton) {
                closeButton.addEventListener('click', function () {
                    bootstrapDropdown.hide();
                });
            }
        }
    });
});

//-------------------- sidebar toggle ---------------------------------------

const toggleSidebar = document.querySelector('.toggle-sidebar');

const togglefunction = () => {
    document.querySelector('body').classList.toggle('toggle-close');
}

toggleSidebar.addEventListener('click', togglefunction);

//-------------------- drag cards ---------------------------------------

function allowDrop(event) {
    event.preventDefault();
}

// Function to handle the start of dragging
function drag(event) {
    // Store the ID of the dragged card
    event.dataTransfer.setData("text", event.target.id);
}

// Function to handle the drop event
function drop(event) {
    event.preventDefault();
    // Get the ID of the dragged card
    var data = event.dataTransfer.getData("text");
    var draggedElement = document.getElementById(data);

    // Check if the drop target is a valid card container and append the dragged element to it
    if (event.target.classList.contains('card-container')) {
        event.target.appendChild(draggedElement);
    } else if (event.target.closest('.card-container')) {
        // If the target is inside a card container, find the correct position
        var container = event.target.closest('.card-container');

        // Get the position of the mouse inside the container
        var rect = container.getBoundingClientRect();
        var mouseY = event.clientY;

        // Get all the cards in the container
        var cards = container.querySelectorAll('.drag-card');
        var insertBefore = null;

        // Check where the mouse position is and decide the insertion point
        for (var i = 0; i < cards.length; i++) {
            var card = cards[i];
            var cardRect = card.getBoundingClientRect();
            if (mouseY < cardRect.top + cardRect.height / 2) {
                insertBefore = card;
                break;
            }
        }

        // Insert the dragged element at the correct position
        if (insertBefore) {
            container.insertBefore(draggedElement, insertBefore);
        } else {
            container.appendChild(draggedElement);
        }
    }
}


//-------------------- add list ---------------------------------------

const addList = document.querySelector('.add-list-trigger');
const boxElement = document.querySelector('.add-list-box');
const addListFunction = () => {
    document.querySelector('.add-list-body').classList.remove('d-none');
    document.querySelector('.add-list-trigger').classList.add('d-none');
}
const closeListFunction = () => {
    document.querySelector('.add-list-body').classList.add('d-none');
    document.querySelector('.add-list-trigger').classList.remove('d-none');
}

addList.addEventListener('click', addListFunction);
document.querySelector('.close-add-list').addEventListener('click', closeListFunction);

document.addEventListener('click', (event) => {
    // Check if the click was outside the box
    if (!boxElement.contains(event.target)) {
        closeListFunction(); // Close the list
    }
});
