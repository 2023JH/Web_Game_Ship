'use strict'
var vcanvas, ctx;
var r_left, r_up, r_right, r_down;
var ct = {x: 500, y: 100, r: 50, v: 1};
var rt = {x: 200, y: 100, w: 200, h: 150};

function clearCanvas(){
    ctx.clearRect(0, 0, vcanvas.width, vcanvas.height);
}

function drawCT(){
    ctx.beginPath();
    ctx.arc(ct.x, ct.y, ct.r, 0, Math.PI * 2);
    ctx.stroke();
    // 중점
    ctx.beginPath();
    ctx.arc(ct.x, ct.y, 2, 0, Math.PI * 2);
    ctx.stroke();
    //text
    ctx.fillText("(ct.x, ct.y)", ct.x - 30, ct.y + 8);
}

function drawRT(){
    ctx.strokeRect(rt.x, rt.y, rt.w, rt.h);
    ctx.fillText("(x0, y0)", rt.x - 20, rt.y - 5);
    ctx.fillText("(x0, y1)", rt.x - 20, rt.y + rt.h + 15);
    ctx.fillText("(x1, y0)", rt.x  + rt.w - 20, rt.y - 5);
    ctx.fillText("(x1, y1)", rt.x + rt.w -20, rt.y + rt.h + 15);
}

function gameLoop(){
    clearCanvas();
    drawCT();
    drawRT();
}

function init() {
    vcanvas = document.getElementById("myCanvas");
    ctx = vcanvas.getContext("2d");

    setInterval(gameLoop, 33);
}
// Key Control
function setKey(event) {
    if (event.keyCode === 37) { r_left = 1; }
    if (event.keyCode === 38) { r_up = 1; }
    if (event.keyCode === 39) { r_right = 1; }
    if (event.keyCode === 40) { r_down = 1; }
}

function stopKey(event) {
    if (event.keyCode === 37) { r_left = 0; }
    if (event.keyCode === 38) { r_up = 0; }
    if (event.keyCode === 39) { r_right = 0; }
    if (event.keyCode === 40) { r_down = 0; }
}

document.onkeydown = setKey;
document.onkeyup = stopKey;