'use strict';
var vcanvas, ctx;
var sx, sy;
var r_left, r_up, r_right, r_down;
var vel = 6;

function clearCanvas(){
    ctx.clearRect(0, 0, vcanvas.width, vcanvas.height);
}

function updateShip(){
    if(r_left){ sx -= vel;}
    if(r_up){ sy -= vel;}
    if(r_right){ sx += vel;}
    if(r_down){ sy += vel;}
}

function drawShip(){
    ctx.beginPath();
    ctx.moveTo(sx + 15, sy);
    ctx.lineTo(sx, sy - 15);
    ctx.lineTo(sx - 60, sy);
    ctx.lineTo(sx, sy + 15);
    ctx.closePath();
    ctx.fillStyle = "red";
    ctx.fill();
}

function gameLoop(){
    clearCanvas();
    drawShip();
    updateShip();
}

function init() {
    vcanvas = document.getElementById("myCanvas");
    ctx = vcanvas.getContext("2d");

    sx = 700;
    sy = 200;

    setInterval(gameLoop, 33);
}

//key control
function setKey(event){
    if(event.keycode === 37) { r_left = 1;}
    if(event.keycode === 38) { r_up = 1;}
    if(event.keycode === 39) { r_right = 1;}
    if(event.keycode === 40) { r_down = 1;}
}
function stopKey(event){
    if(event.keycode === 37) { r_left = 0;}
    if(event.keycode === 38) { r_up = 0;}
    if(event.keycode === 39) { r_right = 0;}
    if(event.keycode === 40) { r_down = 0;}
}

document.onkeydown = setKey;
document.onkeyup = stopKey;