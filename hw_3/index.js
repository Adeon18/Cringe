
const containers = document.getElementsByName('main-box-container');
const startDiv = document.getElementsByName('box1');


let div = startDiv[0]
let offset = [0, 0];
let isMouseLeftPressed = false;
let currentColorIdx = 0
let divCount = 1
let divCreated = 1

let colorArray = ['#fc3c7a', '#c3c3c3', '#3c3a3a'];


function changeDivBgColor() {
    div.style.backgroundColor = colorArray[currentColorIdx % colorArray.length];
    currentColorIdx++;
}


function changeDivSize() {
    div.classList.toggle('box-large');
}


function mouseDownHandler(ev) {
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

    ev = ev || window.event;

    if (isMouseLeftPressed) {
        mousePosition = {
            x : ev.clientX,
            y : ev.clientY
        };

        div.style.left = (mousePosition.x + offset[0]) + 'px';
        div.style.top  = (mousePosition.y + offset[1]) + 'px';
    }
}


function doubleClickHandler(ev) {
    ev = ev || window.event;

    if (ev.altKey) {
        if (divCount > 1) {
            div = ev.target;
            divCount--;
            div.remove();
        }
    } else {
        div = document.createElement('div');

        divCount++;
        divCreated++;
        let text = document.createTextNode(divCreated);
    
        div.classList.add('box');
    
        div.appendChild(text);
        containers[0].appendChild(div);

        div.style.left = (ev.clientX) + 'px';
        div.style.top  = (ev.clientY) + 'px';
    
        div.addEventListener('mousedown', mouseDownHandler)
        div.addEventListener('mouseup', mouseUpHandler)
        div.addEventListener('dblclick', doubleClickHandler)
    }
}


document.addEventListener('mousemove', mouseMoveHandler)

div.addEventListener('mousedown', mouseDownHandler)
div.addEventListener('mouseup', mouseUpHandler)
div.addEventListener('dblclick', doubleClickHandler)