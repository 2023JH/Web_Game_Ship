'use strict';
var vcanvas, ctx;
var sx, sy;
var stype = 0;
var sp = 0;

// 방향키 관련 변수 추가
var leftPressed = false;
var rightPressed = false;
var upPressed = false;
var downPressed = false;

var arrEnemy_v16 = [];

function clearCanvas() {
    ctx.clearRect(0, 0, vcanvas.width, vcanvas.height);
}

function drawShip() {
    ctx.beginPath();
    ctx.fillStyle = "red";
    ctx.moveTo(sx - 15, sy);
    ctx.lineTo(sx, sy - 15);
    ctx.lineTo(sx + 60, sy);
    ctx.lineTo(sx, sy + 15);
    ctx.closePath();
    ctx.fill();

    if (stype === 1) {
        ctx.fillRect(sx + 42, sy - 5, 10, 10);
    }
    if (stype > 1) {
        ctx.fillRect(sx + 10, sy - 15, 10, 30);
    }
    if (stype === 3) {
        ctx.fillRect(sx, sy - 19, 10, 38);
    }
}

function drawBullet() {
    if (sp === 1) {
        ctx.fillStyle = "green";
        if (stype !== 1) {
            ctx.fillRect(sx + 60, sy - 2, 5, 4);
        }
        if (stype === 1) {
            ctx.fillRect(sx + 52, sy - 5, 5, 4);
            ctx.fillRect(sx + 52, sy + 1, 5, 4);
        }
        if (stype > 1) {
            ctx.fillRect(sx + 20, sy - 15, 5, 4);
            ctx.fillRect(sx + 20, sy + 11, 5, 4);
        }
        if (stype === 3) {
            ctx.fillRect(sx + 10, sy - 19, 5, 4);
            ctx.fillRect(sx + 10, sy + 15, 5, 4);
        }
    }
}

function moveShip() {
    if (leftPressed && sx > 0) {
        sx -= 2;
    }
    if (rightPressed && sx < vcanvas.width - 60) {
        sx += 2;
    }
    if (upPressed && sy > 0) {
        sy -= 2;
    }
    if (downPressed && sy < vcanvas.height - 15) {
        sy += 2;
    }
}

function clearCanvas_v16() {
    ctx.clearRect(0, 0, vcanvas.width, vcanvas.height);
}

function createEnemy_v16() {
    if (arrEnemy_v16.length < 20) { // 배열에 있는 적의 수가 20개 미만인지 확인
        var x_v16, y_v16, wh_v16, c_v16, v_v16; // 선언

        wh_v16 = Math.floor(Math.random() * (30 + 1)) + 10;   // 정의
        x_v16 = vcanvas.width; // x 위치 canvas 너비로 고정 (오른쪽 끝 생성)
        y_v16 = Math.floor(Math.random() * (vcanvas.height - wh_v16));
        c_v16 = "#" + parseInt(Math.random() * 0xffffff, 10).toString(16);
        v_v16 = Math.floor(Math.random() * 2) + 1;       // 1 or 2

        arrEnemy_v16.push({ x: x_v16, y: y_v16, c: c_v16, wh: wh_v16, v: v_v16 });
    }

    if (arrEnemy_v16.length > 20) {
        arrEnemy_v16.shift();
    }
}

function drawEnemy_v16() {
    var i;
    for (i = 0; i < arrEnemy_v16.length; i += 1) {
        ctx.fillStyle = arrEnemy_v16[i].c;
        ctx.fillRect(arrEnemy_v16[i].x, arrEnemy_v16[i].y, arrEnemy_v16[i].wh, arrEnemy_v16[i].wh);
    }
}

function updateEnemy_v16() {
    if (sp) {
        var i;
        for (i = 0; i < arrEnemy_v16.length; i += 1) {
            arrEnemy_v16[i].x -= arrEnemy_v16[i].v;
        }
    }
}

function deleteEnemy_v16() {
    var i;
    for (i = 0; i < arrEnemy_v16.length; i += 1) {
        if (arrEnemy_v16[i].x + arrEnemy_v16[i].wh < 0) {
            arrEnemy_v16.splice(i, 1);
        }
    }
}

function gameLoop() {
    clearCanvas();
    drawShip();
    drawBullet();
    moveShip();
    drawEnemy_v16();
    updateEnemy_v16();
    deleteEnemy_v16();
    requestAnimationFrame(gameLoop);
}

function init() {
    vcanvas = document.getElementById("myCanvas");
    ctx = vcanvas.getContext("2d");

    sx = 200;
    sy = 200;
    sp = 0;

    document.addEventListener("keydown", keyDownHandler);
    document.addEventListener("keyup", keyUpHandler);
    
    // 적을 주기적으로 생성하도록 setInterval을 사용
    setInterval(createEnemy_v16, 1000); // 매 1초마다 createEnemy_v16 함수 호출
    requestAnimationFrame(gameLoop);
}


// Key Control
function setKey(event) {
    if (event.keyCode === 48) {
        stype = 0;
    }
    if (event.keyCode === 49) {
        stype = 1;
    }
    if (event.keyCode === 50) {
        stype = 2;
    }
    if (event.keyCode === 51) {
        stype = 3;
    }

    if (event.keyCode === 32) {
        sp = 1;
    }
}

function stopKey(event) {
    if (event.keyCode === 32) {
        sp = 0;
    }
}

// 방향키 이벤트 핸들러 함수 추가
function keyDownHandler(event) {
    if (event.key === "ArrowLeft") {
        leftPressed = true;
    }
    if (event.key === "ArrowRight") {
        rightPressed = true;
    }
    if (event.key === "ArrowUp") {
        upPressed = true;
    }
    if (event.key === "ArrowDown") {
        downPressed = true;
    }
}

function keyUpHandler(event) {
    if (event.key === "ArrowLeft") {
        leftPressed = false;
    }
    if (event.key === "ArrowRight") {
        rightPressed = false;
    }
    if (event.key === "ArrowUp") {
        upPressed = false;
    }
    if (event.key === "ArrowDown") {
        downPressed = false;
    }
}

document.onkeydown = setKey;
document.onkeyup = stopKey;

init();
