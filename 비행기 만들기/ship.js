var vcanvas, ctx;
var sx, sy;
var stype = 0; // You need to declare the 'stype' variable.

function clearCanvas() {
    ctx.clearRect(0, 0, vcanvas.width, vcanvas.height);
}

function drawShip() {  
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

function gameLoop() {
    clearCanvas();
    drawShip();
}

function init(){
    vcanvas = document.getElementById("myCanvas");
    ctx = vcanvas.getContext("2d");

    sx = 200;
    sy = 200;

    setInterval(gameLoop, 33);
}

// key Control

function setKey(event){
    if(event.keyCode === 48){ stype = 0; }
    if(event.keyCode === 49){ stype = 1; }
    if(event.keyCode === 50){ stype = 2; }
    if(event.keyCode === 51){ stype = 3; }
}

document.onkeydown = setKey;
