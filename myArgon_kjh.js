'use strict';
var vcanvas, ctx;
var sx, sy;
var stype;
var r_left, r_up, r_right, r_down;
var vel = 5;
var fire = 0;
var arrRocket = [];
var arrEnemy = [];

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

    if (stype === 2) {
        ctx.fillStyle = "red";
        ctx.fillRect(sx - 52, sy - 5, 10, 10);
    }

    if (stype > 2) {
        ctx.fillStyle = "red";
        ctx.fillRect(sx - 20, sy - 15, 10, 30);
    }

    if (stype === 4) {
        ctx.fillStyle = "red";
        ctx.fillRect(sx - 20, sy - 15, 10, 30);
        ctx.fillRect(sx - 10, sy - 19, 10, 38);
    }
}

// Rocket
function createRocket() {
    if (fire) {
        if (stype != 1) {
            arrRocket.push({ x: sx - 62, y: sy, r: 2, c: "green", v: 7 });
        }

        if (stype === 2) {
            arrRocket.push({ x: sx - 54, y: sy, r: 2, c: "green", v: 7 });
            arrRocket.push({ x: sx - 54, y: sy, r: 2, c: "green", v: 7 });
        }

        if (stype > 2) {
            arrRocket.push({ x: sx - 62, y: sy, r: 2, c: "green", v: 7 });
            arrRocket.push({ x: sx - 62, y: sy, r: 2, c: "green", v: 7 });
        }

        if (stype === 4) {
            arrRocket.push({ x: sx - 62, y: sy, r: 2, c: "green", v: 7 });
            arrRocket.push({ x: sx - 62, y: sy, r: 2, c: "green", v: 7 });
        }
    }
}

function updateRocket() {
    var i;
    for (i = 0; i < arrRocket.length; i += 1) {
        arrRocket[i].x -= arrRocket[i].v;
    }
}

function deleteRocket() {
    var i;
    for (i = 0; i < arrRocket.length; i += 1) {
        if (arrRocket[i].x > vcanvas.width) {
            arrRocket.splice(i, 1);
        }
    }
}

function drawRocket() {
    var i;
    for (i = 0; i < arrRocket.length; i += 1) {
        ctx.fillStyle = arrRocket[i].c;
        ctx.fillRect(
            arrRocket[i].x,
            arrRocket[i].y,
            arrRocket[i].rw,
            arrRocket[i].rh
        );
    }
}

// Enemy
function createEnemy() {
    var x, y, wh, c, v;

    x = vcanvas.width;
    y = Math.floor(Math.random() * vcanvas.height) + 1;
    wh = Math.floor(Math.random() * 31) + 10;
    c = "#" + parseInt(Math.random() * 0xffffff, 10).toString(16);
    v = Math.floor(Math.random() * 3) + 1;

    arrEnemy.push({ x: x, y: y, wh: wh, v: v, c: c });
}

function updateEnemy() {
    var i;
    for (i = 0; i < arrEnemy.length; i += 1) {
        arrEnemy[i].x += arrEnemy[i].v;
    }
}

function deleteEnemy() {
    var i;
    for (i = 0; i < arrEnemy.length; i += 1) {
        if (arrEnemy[i].x + arrEnemy[i].wh < 0) {
            arrEnemy.splice(i, 1);
        }
    }
}

function drawEnemy() {
    var i;
    for (i = 0; i < arrEnemy.length; i += 1) {
        ctx.fillStyle = arrEnemy[i].c;
        ctx.fillRect(
            arrEnemy[i].x,
            arrEnemy[i].y,
            arrEnemy[i].wh,
            arrEnemy[i].wh
        );
    }
}

// Main
function gameLoop() {
    clearCanvas();

    updateShip();
    drawShip();

    updateRocket();
    deleteRocket();
    drawRocket();

    updateEnemy();
    deleteEnemy();
    drawEnemy();
}

function init() {
    vcanvas = document.getElementById("myCanvas");
    ctx = vcanvas.getContext("2d");

    sx = 700;
    sy = 200;

    setInterval(createEnemy, 999);
    setInterval(createRocket, 99);
    setInterval(gameLoop, 33);
}

function setKey(event) {
    // move
    if (event.keyCode === 37) { r_left = 1; }
    if (event.keyCode === 38) { r_up = 1; }
    if (event.keyCode === 39) { r_right = 1; }
    if (event.keyCode === 40) { r_down = 1; }

    // ship type
    if (event.keyCode === 49) { stype = 1; }
    if (event.keyCode === 50) { stype = 2; }
    if (event.keyCode === 51) { stype = 3; }
    if (event.keyCode === 52) { stype = 4; }

    // Rocket
    if (event.keyCode === 32) { fire = 1; }
}

function stopKey(event) {
    // move
    if (event.keyCode === 37) { r_left = 0; }
    if (event.keyCode === 38) { r_up = 0; }
    if (event.keyCode === 39) { r_right = 0; }
    if (event.keyCode === 40) { r_down = 0; }

    // Rocket
    if (event.keyCode === 32) { fire = 0; }
}

document.onkeydown = setKey;
document.onkeyup = stopKey;
