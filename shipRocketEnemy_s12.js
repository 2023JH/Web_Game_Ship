'use strict';
var vcanvas, ctx;
var sx, sy;
var stype_s12;
var r_left, r_up, r_right, r_down;
var vel_s12 = 5; // 요구사항 5
var fire_s12 = 0;
var arrRocket_s12 = [];
var arrEnemy_s12 = [];

function clearCanvas_s12() {
    ctx.clearRect(0, 0, vcanvas.width, vcanvas.height);
}

// Ship
function updateShip_s12() {
    // 이동, 요구사항 4
    if (r_left) { sx -= vel_s12; }
    if (r_up) { sy -= vel_s12; }
    if (r_right) { sx += vel_s12; }
    if (r_down) { sy += vel_s12; }

    // 보정, 요구사항 7
    if (sx - 60 < 0) { sx = 60; }
    if (sx + 15 > vcanvas.width) { sx = vcanvas.width - 15; }
    if (sy - 20 < 0) { sy = 20; }
    if (sy + 20 > vcanvas.height) { sy = vcanvas.height - 20; }
}

function drawShip_s12() { // 요구사항 1,2
    // 기본 배, 요구사항 3, 6-1
    ctx.beginPath();
    ctx.moveTo(sx + 15, sy);
    ctx.lineTo(sx, sy + 15);
    ctx.lineTo(sx - 60, sy);
    ctx.lineTo(sx, sy - 15);
    ctx.fillStyle = "red";
    ctx.fill();

    // 2단계, 요구사항 6-2
    if (stype_s12 === 2) {
        ctx.fillStyle = "red";
        ctx.fillRect(sx - 52, sy - 5, 10, 10);
    }

    // 3단계, 요구사항 6-3
    if (stype_s12 === 3) {
        ctx.fillStyle = "red";
        ctx.fillRect(sx - 20, sy - 15, 10, 30);
    }
    // 4단계, 요구사항 6-4
    if (stype_s12 === 4) {
        ctx.fillStyle = "red";
        ctx.fillRect(sx - 20, sy - 15, 10, 30);
        ctx.fillRect(sx - 10, sy - 19, 10, 38);
    }
}

// Rocket
function createRocket_s12() {
    if (fire_s12) {
        // 기본일 때, 요구사항 1
        if (stype_s12 === 1) {
            arrRocket_s12.push({ x: sx - 60, y: sy - 2, rw: 5, rh: 4, c: "green", v: 7 });// 요구사항 6,7
        }

        // 2단계, 요구사항 1
        if (stype_s12 === 2) {
            arrRocket_s12.push({ x: sx - 55, y: sy + 1, rw: 5, rh: 4, c: "green", v: 7 });// 요구사항 6,7
            arrRocket_s12.push({ x: sx - 55, y: sy - 5, rw: 5, rh: 4, c: "green", v: 7 });// 요구사항 6,7
        }

        // 3단계, 요구사항 1
        if (stype_s12 === 3) {
            arrRocket_s12.push({ x: sx - 60, y: sy - 2, rw: 5, rh: 4, c: "green", v: 7 });// 요구사항 6,7
            arrRocket_s12.push({ x: sx - 20, y: sy - 15, rw: 5, rh: 4, c: "green", v: 7 });// 요구사항 6,7
            arrRocket_s12.push({ x: sx - 20, y: sy + 11, rw: 5, rh: 4, c: "green", v: 7 });// 요구사항 6,7
        }

        // 4단계, 요구사항 1
        if (stype_s12 === 4) {
            arrRocket_s12.push({ x: sx - 60, y: sy - 2, rw: 5, rh: 4, c: "green", v: 7 });// 요구사항 6,7
            arrRocket_s12.push({ x: sx - 20, y: sy - 15, rw: 5, rh: 4, c: "green", v: 7 });// 요구사항 6,7
            arrRocket_s12.push({ x: sx - 20, y: sy + 11, rw: 5, rh: 4, c: "green", v: 7 });// 요구사항 6,7
            arrRocket_s12.push({ x: sx - 10, y: sy - 19, rw: 5, rh: 4, c: "green", v: 7 });// 요구사항 6,7
            arrRocket_s12.push({ x: sx - 10, y: sy + 15, rw: 5, rh: 4, c: "green", v: 7 });// 요구사항 6,7
        }
    }
}

function updateRocket_s12() {
    var i;
    for (i = 0; i < arrRocket_s12.length; i += 1) {
        arrRocket_s12[i].x -= arrRocket_s12[i].v // 요구사항 2
    }
}

function deleteRocket_s12() { //요구사항 8
    var i;
    for (i = 0; i < arrRocket_s12.length; i += 1) {
        if (arrRocket_s12[i].x > vcanvas.width) {
            arrRocket_s12.splice(i, 1);
        }
    }
}

function drawRocket_s12() {
    var i;
    for (i = 0; i < arrRocket_s12.length; i += 1) {
        ctx.fillStyle = arrRocket_s12[i].c;
        ctx.fillRect(
            arrRocket_s12[i].x,
            arrRocket_s12[i].y,
            arrRocket_s12[i].rw,
            arrRocket_s12[i].rh
        );
    }
}

// Enemy
function creatEnemy_s12() { // 요구사항 2
    var x_s12, y_s12, wh_s12, c_s12, v_s12;

    x_s12 = vcanvas.width;
    y_s12 = Math.floor(Math.random() * vcanvas.height) + 1;
    wh_s12 = Math.floor(Math.random() * 31) + 10; // 요구사항 5
    c_s12 = "#" + parseInt(Math.random() * 0xffffff, 10).toString(16); // 요구사항 6
    v_s12 = Math.floor(Math.random() * 3) + 1; // 요구사항 7

    arrEnemy_s12.push({ x: x_s12, y: y_s12, wh: wh_s12, v: v_s12, c: c_s12 });
}

function updateEnemy_s12() { // 요구사항 3
    var i;
    for (i = 0; i < arrEnemy_s12.length; i += 1) {
        arrEnemy_s12[i].x += arrEnemy_s12[i].v;
    }
}

function deleteEnemy_s12() { // 요구사항 8
    var i;
    for (i = 0; i < arrEnemy_s12.length; i += 1) {
        if (arrEnemy_s12[i].x + arrEnemy_s12[i].wh < 0) {
            arrEnemy_s12.splice(i, 1);
        }
    }
}

function drawEnemy_s12(){
    var i;
    for(i=0;i<arrEnemy_s12.length;i+=1){
        ctx.fillStyle = arrEnemy_s12[i].c;
        ctx.fillRect(
            arrEnemy_s12[i].x,
            arrEnemy_s12[i].y,
            arrEnemy_s12[i].wh,
            arrEnemy_s12[i].wh
        ); // 요구사항 4,5,6,7
    }
}

// Main
function gameLoop_s12() {
    clearCanvas_s12();

    updateShip_s12();
    drawShip_s12();

    updateRocket_s12();
    deleteRocket_s12();
    drawRocket_s12();

    updateEnemy_s12();
    deleteEnemy_s12();
    drawEnemy_s12();
}

function init() {
    vcanvas = document.getElementById("myCanvas");
    ctx = vcanvas.getContext("2d");

    // 요구사항 3
    sx = 700;
    sy = 200;

    setInterval(creatEnemy_s12, 999);
    setInterval(createRocket_s12, 99);
    setInterval(gameLoop_s12, 33);
}

function setKey(event) {
    // move, 요구사항 4
    if (event.keyCode === 37) { r_left = 1; }
    if (event.keyCode === 38) { r_up = 1; }
    if (event.keyCode === 39) { r_right = 1; }
    if (event.keyCode === 40) { r_down = 1; }

    // ship type
    if (event.keyCode === 49) { stype_s12 = 1; } // 요구사항 6-1
    if (event.keyCode === 50) { stype_s12 = 2; } // 요구사항 6-2
    if (event.keyCode === 51) { stype_s12 = 3; } // 요구사항 6-3
    if (event.keyCode === 52) { stype_s12 = 4; } // 요구사항 6-4

    // Rocket
    if (event.keyCode === 32) { fire_s12 = 1; }
}

function stopKey(event) {
    // move, 요구사항 4
    if (event.keyCode === 37) { r_left = 0; }
    if (event.keyCode === 38) { r_up = 0; }
    if (event.keyCode === 39) { r_right = 0; }
    if (event.keyCode === 40) { r_down = 0; }

    // Rocket
    if (event.keyCode === 32) { fire_s12 = 0; }
}

document.onkeydown = setKey;
document.onkeyup = stopKey;