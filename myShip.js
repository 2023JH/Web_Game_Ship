'use strict';
var vcanvas, ctx;
var sx, sy;
var stype;
var r_left, r_up, r_right, r_down;
var vel = 5;

function clearCanvas() {
    ctx.clearRect(0, 0, vcanvas.width, vcanvas.height);
}

// Ship
function updateShip() {
    // 이동
    if (r_left) { sx -= vel; }
    if (r_up) { sy -= vel; }
    if (r_right) { sx += vel; }
    if (r_down) { sy += vel; }

    // 보정
    if (sx - 60 < 0) { sx = 60; }
    if (sx + 15 > vcanvas.width) { sx = vcanvas.width - 15; }
    if (sy - 20 < 0) { sy = 20; }
    if (sy + 20 > vcanvas.height) { sy = vcanvas.height - 20; }
}

function drawShip() {
    // 기본 배
    ctx.beginPath();
    ctx.moveTo(sx + 15, sy);
    ctx.lineTo(sx, sy + 15);
    ctx.lineTo(sx - 60, sy);
    ctx.lineTo(sx, sy - 15);
    ctx.fillStyle = "red";
    ctx.fill();

    // 2단계
    if (stype === 2) {
        ctx.fillStyle = "red";
        ctx.fillRect(sx - 52, sy - 5, 10, 10);
    }

    // 3단계
    if (stype === 3) {
        ctx.fillStyle = "red";
        ctx.fillRect(sx - 20, sy - 15, 10, 30);
    }

    // 4단계
    if (stype === 4) {
        ctx.fillStyle = "red";
        ctx.fillRect(sx - 20, sy - 15, 10, 30);
        ctx.fillRect(sx - 10, sy - 19, 10, 38);
    }
}

// Main
function gameLoop() {
    clearCanvas();

    updateShip();
    drawShip();
}

function init() {
    vcanvas = document.getElementById("myCanvas");
    ctx = vcanvas.getContext("2d");

    // 요구사항 3
    sx = 700;
    sy = 200;

    setInterval(gameLoop, 33);
}

function setKey(event) {
    // move
    if (event.keyCode === 37) { r_left = 1; }
    if (event.keyCode === 38) { r_up = 1; }
    if (event.keyCode === 39) { r_right = 1; }
    if (event.keyCode === 40) { r_down = 1; }

    // ship type
    if (event.keyCode === 49) { stype = 1; } // 요구사항 6-1
    if (event.keyCode === 50) { stype = 2; } // 요구사항 6-2
    if (event.keyCode === 51) { stype = 3; } // 요구사항 6-3
    if (event.keyCode === 52) { stype = 4; } // 요구사항 6-4
}

function stopKey(event) {
    // move
    if (event.keyCode === 37) { r_left = 0; }
    if (event.keyCode === 38) { r_up = 0; }
    if (event.keyCode === 39) { r_right = 0; }
    if (event.keyCode === 40) { r_down = 0; }
}

document.onkeydown = setKey;
document.onkeyup = stopKey;
