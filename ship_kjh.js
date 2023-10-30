'use strict';
var vcanvas, ctx;
var sx, sy;
var r_left, r_up, r_right, r_down;
var vel = 6;
var stype = 1; 

function clearCanvas() {
    ctx.clearRect(0, 0, vcanvas.width, vcanvas.height);
}

function updateShip() {
    var h = 15;

    if (r_left) {
        sx -= vel;
    }
    if (r_up) {
        sy -= vel;
    }
    if (r_right) {
        sx += vel;
    }
    if (r_down) {
        sy += vel;
    }

    // 위치 보정
    if (sx - 60 < 0) {
        sx = 60;
    }
    if (sx + 15 > vcanvas.width) {
        sx = vcanvas.width - 15;
    }
    if ( stype === 4) {
        h = 19;
    }
    if (sy - h < 0) {
        sy = h;
    }
    if (sy + h > vcanvas.height) {
        sy = vcanvas.height - h;
    }
}

function drawShip() {
    ctx.beginPath();
    ctx.moveTo(sx + 15, sy);
    ctx.lineTo(sx, sy - 15);
    ctx.lineTo(sx - 60, sy);
    ctx.lineTo(sx, sy + 15);
    ctx.closePath();
    ctx.fillStyle = "red";
    ctx.fill();

    if (stype === 2) {
        ctx.fillRect(sx - 52, sy - 5, 10, 10);
    }
    if (stype > 2) {
        ctx.fillRect(sx - 20, sy - 15, 10, 30);
    }
    if (stype === 4) {
        ctx.fillRect(sx - 10, sy - 19, 10, 38);
    }
}

function gameLoop() {
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

// key control
function setKey(event) {
    ctx.fillStyle = "white";
    ctx.fillText(event.keyCode, 100, 100);
    if (event.keyCode === 37) {
        r_left = 1;
    }
    if (event.keyCode === 38) {
        r_up = 1;
    }
    if (event.keyCode === 39) {
        r_right = 1;
    }
    if (event.keyCode === 40) {
        r_down = 1;
    }
    // ship type
    if (event.keyCode === 49) {
        stype = 1;
    }
    if (event.keyCode === 50) {
        stype = 2;
    }
    if (event.keyCode === 51) {
        stype = 3;
    }
    if (event.keyCode === 52) {
        stype = 4;
    }
}

function stopKey(event) {
    if (event.keyCode === 37) {
        r_left = 0;
    }
    if (event.keyCode === 38) {
        r_up = 0;
    }
    if (event.keyCode === 39) {
        r_right = 0;
    }
    if (event.keyCode === 40) {
        r_down = 0;
    }
}

document.onkeydown = setKey;
document.onkeyup = stopKey;
