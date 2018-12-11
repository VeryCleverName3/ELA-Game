function update(){
  updatePlayerPositions();
  drawPlayers();
  blinkManager();
}

function blinkManager(){
  //draw player 1's ability bar
  ctx.fillStyle = "blue";
  ctx.fillRect(0, s - (s/100), p1.blink * (s / 2), s / 100);
  if(p1.blink < 1){
    p1.blink += 0.01;
  }

  //same but with p2
  ctx.fillStyle = "red";
  ctx.fillRect(0.5 * s, s - (s/100), p2.blink * (s / 2), s / 100);
  if(p2.blink < 1){
    p2.blink += 0.01;
  }
}

function drawPlayers(){
  ctx.clearRect(0, 0, s, s);
  ctx.strokeRect(0, 0, s, s);

  //Draw blue square
  ctx.fillStyle = "blue";
  ctx.fillRect(p1.x*s - (s*0.01), p1.y*s - (s*0.01), s * 0.02, s * 0.02);

  //Draw red square
  ctx.fillStyle = "red";
  ctx.fillRect(p2.x*s - (s*0.01), p2.y*s - (s*0.01), s * 0.02, s * 0.02);
}

function updatePlayerPositions(){
  if(keyDown[87]){
    p1.y -= p1.speed;
  }
  if(keyDown[83]){
    p1.y += p1.speed;
  }
  if(keyDown[65]){
    p1.x -= p1.speed;
  }
  if(keyDown[68]){
    p1.x += p1.speed;
  }
  if(keyDown[38]){
    p2.y -= p2.speed;
  }
  if(keyDown[40]){
    p2.y += p2.speed;
  }
  if(keyDown[37]){
    p2.x -= p2.speed;
  }
  if(keyDown[39]){
    p2.x += p2.speed;
  }
  if(p1.x < 0){
    p1.x = 0;
  }
  if(p1.x > 1){
    p1.x = 1;
  }
  if(p1.y < 0){
    p1.y = 0;
  }
  if(p1.y > 1){
    p1.y = 1;
  }
  if(p2.x < 0){
    p2.x = 0;
  }
  if(p2.x > 1){
    p2.x = 1;
  }
  if(p2.y < 0){
    p2.y = 0;
  }
  if(p2.y > 1){
    p2.y = 1;
  }
}

var c = document.getElementById("gameCanvas");
var ctx = c.getContext("2d");
c.height = window.innerHeight;
c.width = c.height;
s = c.width;

ctx.lineWidth = 10;
ctx.strokeRect(0, 0, s, s);

var keyDown = [];

//Make player objects
var p1 = {
  x : 0.25,
  y : 0.5,
  speed : 0.005,
  blink : 1
};

var p2 = {
  x : 0.75,
  y : 0.5,
  speed : 0.005,
  blink : 1
};

onkeydown = function(e){
  keyDown[e.which] = true;
  console.log(e.which);
}

onkeyup = function(e){
  keyDown[e.which] = false;
}

setInterval(update, 1000 / 60);
