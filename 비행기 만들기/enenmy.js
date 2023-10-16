'use strict';
var vcanvas, ctx;
//var enemy_v16 = {x: null, y: null, c: null, wh: null, v: null}; //c : color, wh : width&height (정사각형이니까 한번에), v: 속도
var sp = 0;
var arrEnemy_v16 = [];

function clearCanvas_v16(){
    ctx.clearRect(0, 0, vcanvas.width, vcanvas.height);
}

// Enemy
function createEnemy_v16(){
    if (arrEnemy_v16.length < 20) { // 배열에 있는 적의 수가 20개 미만인지 확인
    var x_v16, y_v16, wh_v16, c_v16, v_v16; // 선언

    wh_v16 = Math.floor(Math.random() * (30+1)) + 10;   // 정의
    x_v16 = Math.floor(Math.random() * (vcanvas.width - wh_v16));
    y_v16 = Math.floor(Math.random() * (vcanvas.height - wh_v16)); 
    c_v16 = "#" + parseInt(Math.random() * 0xffffff, 10).toString(16);
    v_v16 = Math.floor(Math.random() * 2) + 1;       // 1 or 2

    //enemy_v16 = {x: x_v16, y: y_v16, c: c_v16, wh: wh_v16, v:v_v16};
    arrEnemy_v16.push({x: x_v16, y: y_v16, c: c_v16, wh: wh_v16, v:v_v16});
    }
    // 적의 개수가 20개를 넘는 경우 가장 먼저 생성된 적을 삭제
    if (arrEnemy_v16.length > 20) {
        arrEnemy_v16.shift(); 
    }
}

function drawEnemy_v16(){
    var i;
    for(i = 0; i < arrEnemy_v16.length; i+= 1){
        ctx.fillStyle = arrEnemy_v16[i].c;
        ctx.fillRect(arrEnemy_v16[i].x, arrEnemy_v16[i].y, arrEnemy_v16[i].wh, arrEnemy_v16[i].wh);
    }
    //ctx.fillStyle = enemy_v16.c;
    //ctx.fillRect(enemy_v16.x, enemy_v16.y, enemy_v16.wh, enemy_v16.wh);
}

function updateEnemy_v16(){ 
    if (sp) { // sp가 1인 경우에만 업데이트 (정지 된 상태)
        var i;
        for(i = 0; i < arrEnemy_v16.length; i+= 1){
            arrEnemy_v16[i].x -= arrEnemy_v16[i].v;
        }
    //enemy_v16.x -= enemy_v16.v; 
    }
}

function deleteEnemy_v16(){
    var i;
    for(i = 0; i < arrEnemy_v16.length; i+= 1){
        if(arrEnemy_v16[i].x + arrEnemy_v16[i].wh < 0){
            arrEnemy_v16.splice(i, 1);
        }
    }
}

// Game
function gameLoop(){
    clearCanvas_v16();
  //  if(sp) {createEnemy_v16(); }
  //  createEnemy_v16();
    drawEnemy_v16();
    updateEnemy_v16();
    deleteEnemy_v16();
}

function init(){
    vcanvas = document.getElementById("myCanvas");
    ctx = vcanvas.getContext("2d");

    setInterval(createEnemy_v16, 1000);
    setInterval(gameLoop, 500);
}

//key control
function setKey(event){
    if(event.keyCode === 32) { sp = 1;}  //space
}
function stopKey(event){
    if(event.keyCode === 32) { sp = 0;}
}
document.onkeydown = setKey;
document.onkeyup = stopKey;
