'use strict'
var vcanvas, ctx;
var r_left, r_up, r_right, r_down;
var ct = {x: 510, y: 100, r: 50, v: 1};
var rt = {x: 200, y: 150, w: 200, h: 150};

function clearCanvas(){
    ctx.clearRect(0, 0, vcanvas.width, vcanvas.height);
}

function checkHit(rt, ct){
    var vResult = false;
}

function updateCT(){
    if(r_left) {ct.x -= ct.v}
    if(r_up) {ct.y -= ct.v}
    if(r_right) {ct.x += ct.v}
    if(r_down) {ct.y += ct.v}
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
    ctx.fillText("(ct.x, ct.y)", ct.x - 30, ct.y + 10);
}

function drawRT(){
    ctx.strokeRect(rt.x, rt.y, rt.w, rt.h);
    ctx.fillText("(x0, y0)", rt.x - 20, rt.y - 5);
    ctx.fillText("(x0, y1)", rt.x - 20, rt.y + rt.h + 15);
    ctx.fillText("(x1, y0)", rt.x  + rt.w - 20, rt.y - 5);
    ctx.fillText("(x1, y1)", rt.x + rt.w -20, rt.y + rt.h + 15);
}

function drawExtend(){
   // ctx.strokeRect(rt.x-ct.r, rt.y-ct.r, rt.w+ct.r*2 , rt.h+ct.r*2);
    ctx.strokeStyle = "red";
    ctx.setLineDash([1]);

    ctx.beginPath();
    ctx.moveTo(rt.x - ct.r, rt.y - ct.r);
    ctx.lineTo(rt.x + rt.w + ct.r, rt.y - ct.r);
    ctx.lineTo(rt.x + rt.w + ct.r, rt.y + rt.h + ct.r);
    ctx.lineTo(rt.x - ct.r, rt.y + rt.h + ct.r);
    ctx.closePath();
    
    ctx.stroke();
    ctx.setLineDash([0]);
    ctx.strokeStyle = "black";
}

function gameLoop(){
    clearCanvas();
    updateCT();
    drawCT();
    drawRT();
    drawExtend();
}

function init() {
    vcanvas = document.getElementById("myCanvas");
    ctx = vcanvas.getContext("2d");

    ctx.font = "15px Arial";
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