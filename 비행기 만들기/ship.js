var vcanvas, ctx;
var sx, sy;
var stype = 0;
var sp = 0;

function clearCanvas(){
    ctx.clearRect(0, 0, vcanvas.width, vcanvas.height);
}

function drawShip(){  
    ctx.beginPath();
    ctx.fillStyle = "red";
    ctx.moveTo(sx-15, sy);
    ctx.lineTo(sx, sy-15);
    ctx.lineTo(sx+60, sy);
    ctx.lineTo(sx, sy+15);
    ctx.closePath();
    ctx.fill();

    if(stype === 1){
        ctx.fillRect(sx+42, sy-5, 10, 10);
    }
    if(stype > 1){
        ctx.fillRect(sx+10, sy-15, 10, 30);
    }    
    if(stype === 3){
        ctx.fillRect(sx, sy-19, 10, 38);
    }
}


function drawBullet(){
    // if(sp === 1){ // 스페이스바가 눌렸을 때만 총알을 그립니다.
    if(sp){ 
        ctx.fillStyle = "green";
        if(stype != 1){
            ctx.fillRect(sx+60, sy-2, 5, 4);
        }
        if(stype === 1){
            ctx.fillRect(sx+52, sy-5, 5, 4);
            ctx.fillRect(sx+52, sy+1, 5, 4);        
        }
        if(stype > 1){
            ctx.fillRect(sx+20, sy-15, 5, 4);
            ctx.fillRect(sx+20, sy+11, 5, 4);        
        }
        if(stype === 3){
            ctx.fillRect(sx+10, sy-19, 5, 4);
            ctx.fillRect(sx+10, sy+15, 5, 4);        
        }
    }
}

function gameLoop() {
    clearCanvas();
    drawShip();
    drawBullet();
}

function init(){
    vcanvas = document.getElementById("myCanvas");
    ctx = vcanvas.getContext("2d");

    sx = 200;
    sy = 200;
    sp = 0;

    setInterval(gameLoop, 33);
}

// key Control

function setKey(event){
    if(event.keyCode === 48){ stype = 0; }
    if(event.keyCode === 49){ stype = 1; }
    if(event.keyCode === 50){ stype = 2; }
    if(event.keyCode === 51){ stype = 3; }

    if(event.keyCode === 32){ sp = 1; }

}

function stopKey(event) {
    if (event.keyCode === 32) { // 스페이스바를 떼면
        sp = 0; // sp 변수를 0으로 설정하여 총알 발사를 중지합니다.
    }
}

document.onkeydown = setKey;
document.onkeyup = stopKey; // 스페이스바 떼는 이벤트 핸들러를 추가합니다.
