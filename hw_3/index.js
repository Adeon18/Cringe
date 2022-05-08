/* Make a square:
    - Move - Left click and hold
    - Change Color - right click
    - Grow - Shift + Left click
    - Duplicate - Double left click
    - Delete squares until > 1 on board - Alt + Double left click
*/

const containers = document.getElementsByName('main-box-container');
const startDiv = document.getElementsByName('box1');


// div is a global variable that stores all the movement
let div = startDiv[0]
let offset = [0, 0];

// Mouse hold flag
let isMouseLeftPressed = false;


let currentColorIdx = 0
let colorArray = ['#fc3c7a', '#c3c3c3', '#3c3a3a'];

// divCount counts current number of squares, divCreated - total created.
let divCount = 1
let divCreated = 1


// Handlers

function mouseDownHandler(ev) {
    // Because Microsoft
    ev = ev || window.event;

    div = ev.target;
    switch (ev.which) {
        case 1:
            isMouseLeftPressed = true;
            offset = [
                div.offsetLeft - ev.clientX,
                div.offsetTop - ev.clientY
            ];
            if (ev.shiftKey) changeDivSize();
            break;

        case 3:
            changeDivBgColor();
            break;
    }
}


function mouseUpHandler() {
    isMouseLeftPressed = false;
}


function mouseMoveHandler(ev) {
    // Because Microsoft
    ev = ev || window.event;

    if (isMouseLeftPressed) {
        div.style.left = (ev.clientX + offset[0]) + 'px';
        div.style.top  = (ev.clientY + offset[1]) + 'px';
    }
}


function doubleClickHandler(ev) {
    // Because Microsoft
    ev = ev || window.event;

    if (ev.altKey) {
        if (divCount > 1) {
            div = ev.target;
            deleteDiv();
        }
    } else {
        createDiv(ev);
    }
}



function changeDivBgColor() {
    div.style.backgroundColor = colorArray[currentColorIdx % colorArray.length];
    currentColorIdx++;
}


function changeDivSize() {
    div.classList.toggle('box-large');
}


function deleteDiv() {
    divCount--;
    div.remove();
}


function addEventListeners() {
    div.addEventListener('mousedown', mouseDownHandler)
    div.addEventListener('mouseup', mouseUpHandler)
    div.addEventListener('dblclick', doubleClickHandler)
}


function createDiv(event) {
    div = document.createElement('div');

    divCount++;
    divCreated++;

    let text = document.createTextNode(divCreated);

    div.classList.add('box');

    div.appendChild(text);
    containers[0].appendChild(div);

    div.style.left = (event.clientX) + 'px';
    div.style.top  = (event.clientY) + 'px';

    addEventListeners();
}


/* This gets assigned to document because when a mouse is moving fast,
It can go out of the rectangle which will make it stop even if we hold the mouse */
document.addEventListener('mousemove', mouseMoveHandler)

addEventListeners();