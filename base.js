'use strict'
var vcanvas, ctx;
var r_left, r_up, r_right, r_down;
var ct = {x: 510, y: 100, r: 50, v: 1};
var rt = {x: 200, y: 150, w: 200, h: 150};

function clearCanvas(){
    ctx.clearRect(0, 0, vcanvas.width, vcanvas.height);
}

function distance(x1, y1, x2, y2){
    var dx, dy;
    dx = x2 - x1;
    dy = y2 - y1;

    return Math.sqrt(dx*dx + dy*dy);
}

function checkHit(rt, ct){
    var vResult = false;
    if( ct.x > rt.x - ct.r && 
        ct.x < rt.x + rt.w + ct.r &&
        ct.y > rt.y - ct.r &&
        ct.y < rt.y + rt.h + ct.r ) { // 큰사각형 안에 원의 중점이 들어있는 경우
            vResult = true; // 조건에 맞으면 true 이다
            if(ct.x < rt.x) { // 원의 중점이 사각형 '좌'측에 있는 경우
                if(ct.y < rt.y) { // 원의 중점이 좌측 상단 모서리에 있는 경우
                    if(distance(ct.x, ct.y, rt.x, rt.y) > ct.r) { vResult = false; }
                } else if(ct.y > rt.y + rt.h) { // 원의 중점이 좌측 하단모서리에 있는 경우
                    if(distance(ct.x, ct.y, rt.x, rt.y + rt.h) > ct.r) { vResult = false; }
                }
            } else if(ct.x > rt.x + rt.w) { // 원의 중점이 사각형 '우'측 밖에 있는 경우
                if(ct.y < rt.y) { // 원의 중점이 우측 상단 모서리에 있는 경우
                    if(distance(ct.x, ct.y, rt.x + rt.w, rt.y) > ct.r) { vResult = false; }
                } else if (ct.y > rt.y + rt.h) { // 원의 중점이 우측 하단모서리에 있는 경우
                    if (distance(ct.x, ct.y, rt.x + rt.w, rt.y + rt.h) > ct.r) { vResult = false; }
                }
            }
        }
    return vResult;
}

function info(){
    if(checkHit(rt, ct)){
        ctx.fillText("상태 : 충돌", 50, 50);
    } else {
        ctx.fillText("상태 : 미충돌", 50, 50)
    }
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
/*
function drawRT(){
    ctx.strokeRect(rt.x, rt.y, rt.w, rt.h);
    ctx.fillText("(x0, y0)", rt.x - 20, rt.y - 5);
    ctx.fillText("(x0, y1)", rt.x - 20, rt.y + rt.h + 15);
    ctx.fillText("(x1, y0)", rt.x  + rt.w - 20, rt.y - 5);
    ctx.fillText("(x1, y1)", rt.x + rt.w -20, rt.y + rt.h + 15);
}
*/
function drawRT() {
    if (checkHit(rt, ct)) {
        ctx.strokeStyle = "red"; // 충돌이 감지되면 색상을 빨간색으로 설정
    } else {
        ctx.strokeStyle = "black"; // 충돌이 없으면 기본 색상인 검은색으로 설정
    }

    ctx.strokeRect(rt.x, rt.y, rt.w, rt.h);
    ctx.fillText("(x0, y0)", rt.x - 20, rt.y - 5);
    ctx.fillText("(x0, y1)", rt.x - 20, rt.y + rt.h + 15);
    ctx.fillText("(x1, y0)", rt.x + rt.w - 20, rt.y - 5);
    ctx.fillText("(x1, y1)", rt.x + rt.w - 20, rt.y + rt.h + 15);

    ctx.strokeStyle = "black"; // 다른 그림에 대한 효과를 위해 선 색상을 검은색으로 재설정
}

function drawExtend(){
    ctx.strokeStyle = "green";
    ctx.setLineDash([1]);

    ctx.strokeRect(rt.x-ct.r, rt.y-ct.r, rt.w+ct.r*2, rt.h+ct.r*2);

    ctx.beginPath();
    ctx.moveTo(rt.x - ct.r, rt.y);
    ctx.lineTo(rt.x + rt.w + ct.r, rt.y);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(rt.x, rt.y - ct.r);
    ctx.lineTo(rt.x, rt.y + rt.h + ct.r);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(rt.x - ct.r, rt.y + rt.h);
    ctx.lineTo(rt.x + rt.w + ct.r, rt.y + rt.h);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(rt.x + rt.w, rt.y - ct.r);
    ctx.lineTo(rt.x + rt.w, rt.y + rt.h + ct.r);
    ctx.stroke();

/*
    ctx.moveTo(rt.x - ct.r, rt.y - ct.r);
    ctx.lineTo(rt.x + rt.w + ct.r, rt.y - ct.r);
    ctx.lineTo(rt.x + rt.w + ct.r, rt.y + rt.h + ct.r);
    ctx.lineTo(rt.x - ct.r, rt.y + rt.h + ct.r);
    ctx.closePath();    
    ctx.stroke();
*/
    ctx.setLineDash([0]);
    ctx.strokeStyle = "black";
}

function gameLoop(){
    clearCanvas();
    updateCT();
    drawCT();
    drawRT();
    drawExtend();
    info();
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