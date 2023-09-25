var vcanvas, ctx;
var sx, sy;
var stype = 0;
var sp = 0;

// 방향키 관련 변수 추가
var leftPressed = false;
var rightPressed = false;
var upPressed = false;
var downPressed = false;

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

function gameLoop() {
    clearCanvas();
    drawShip();
    drawBullet();
    moveShip();
    requestAnimationFrame(gameLoop); 

function init() {
    vcanvas = document.getElementById("myCanvas");
    ctx = vcanvas.getContext("2d");

    sx = 200;
    sy = 200;
    sp = 0;

    document.addEventListener("keydown", keyDownHandler);
    document.addEventListener("keyup", keyUpHandler);
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
    if (event.keyCode === 37) { // 왼쪽방향키
        leftPressed = true;
    }
    if (event.keyCode === 39) { // 오른쪽방향키
        rightPressed = true;
    }
    if (event.keyCode === 38) { // 위쪽방향키
        upPressed = true;
    }
    if (event.keyCode === 40) { // 아래방향키
        downPressed = true;
    }
}

function keyUpHandler(event) {
    if (event.keyCode === 37) { // 왼쪽방향키
        leftPressed = false;
    }
    if (event.keyCode === 39) { // 오른쪽방향키
        rightPressed = false;
    }
    if (event.keyCode === 38) { // 위쪽방향키
        upPressed = false;
    }
    if (event.keyCode === 40) { // 아래방향키
        downPressed = false;
    }
}

document.onkeydown = setKey;
document.onkeyup = stopKey;

init(); 
