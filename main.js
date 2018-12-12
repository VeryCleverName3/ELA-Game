function update(){
  if(!gameOver){
    updatePlayerPositions();
    drawPlayers();
    blinkManager();
    attackManager();
  } else gameOverScreen();
}

function gameOverScreen(){
  ctx.fillStyle = winner;
  ctx.fillRect(0, 0, s, s);
  ctx.textAlign = "center";
  ctx.font = "40px impact";
  ctx.fillStyle = "black";
  ctx.fillText("Game Over! The winner is " + winner , s / 2, s / 2);
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

  if(p1.blinking){
    p1.blinking = false;
    p1.newx = p1.x;
    p1.newy = p1.y;
    p1.trailTimer = 45;
  }

  if(keyDown[70] && p1.blink >= 0.75){
    p1.blink = 0.25;
    p1.oldx = p1.x;
    p1.oldy = p1.y;
    p1.speed *= 60;
    p1.blinking = true;
  }

  if(p1.trailTimer > 0){
    p1.trailTimer--;
    ctx.strokeStyle = "blue";
    ctx.beginPath();
    ctx.moveTo(p1.oldx * s, p1.oldy * s);
    ctx.lineTo(p1.newx * s, p1.newy * s);
    ctx.stroke();
    ctx.closePath();
  }

  if(p2.blinking){
    p2.blinking = false;
    p2.newx = p2.x;
    p2.newy = p2.y;
    p2.trailTimer = 45;
  }

  if(keyDown[188] && p2.blink >= 0.75){
    p2.blink = 0.25;
    p2.speed *= 60;
    p2.oldx = p2.x;
    p2.oldy = p2.y;
    p2.blinking = true;
  }

  if(p2.trailTimer > 0){
    p2.trailTimer--;
    ctx.strokeStyle = "red";
    ctx.beginPath();
    ctx.moveTo(p2.oldx * s, p2.oldy * s);
    ctx.lineTo(p2.newx * s, p2.newy * s);
    ctx.stroke();
    ctx.closePath();
  }

  //Draw blink effect
}

function drawPlayers(){
  ctx.clearRect(0, 0, s, s);
  ctx.strokeStyle = "black";
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
  if(p1.speed > 0.005){
    p1.speed = 0.005;
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
  if(p2.speed > 0.005){
    p2.speed = 0.005;
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

function attackManager(){
  if(keyDown[71] && p1.blink > 0.2){
    p1.blink -= 0.03;
    if(p1.blink <= 0.2){
      p1.blink = 0;
    }
    ctx.beginPath();
    ctx.fillStyle = "darkblue";
    ctx.arc(p1.x * s, p1.y * s, s / 20, 0, 2 * Math.PI);
    ctx.fill();
    ctx.closePath();
    if(Math.hypot(p1.x - p2.x, p1.y - p2.y)  <= (1/20)){
      console.log("blue wins");
      gameOver = true;
      winner = "blue";
    }
  }
  if(keyDown[190] && p1.blink > 0.2){
    p2.blink -= 0.03;
    if(p2.blink <= 0.2){
      p2.blink = 0;
    }
    ctx.beginPath();
    ctx.fillStyle = "darkred";
    ctx.arc(p2.x * s, p2.y * s, s / 20, 0, 2 * Math.PI);
    ctx.fill();
    ctx.closePath();
    if(Math.hypot(p2.x - p1.x, p2.y - p1.y)  <= (1/20)){
      console.log("red wins");
      gameOver = true;
      winner = "red";
    }
  }
}

var c = document.getElementById("gameCanvas");
var ctx = c.getContext("2d");
c.height = window.innerHeight;
c.width = c.height;
s = c.width;

var gameOver = false;

var winner = "none";

ctx.lineWidth = 10;
ctx.strokeRect(0, 0, s, s);

var keyDown = [];

//Make player objects
var p1 = {
  x : 0.25,
  y : 0.5,
  speed : 0.005,
  blink : 1,
  oldx : -1,
  oldy : -1,
  newx : -1,
  newy : -1,
  blinking : false,
  trailTimer : 0
};

var p2 = {
  x : 0.75,
  y : 0.5,
  speed : 0.005,
  blink : 1,
  oldx : -1,
  oldy : -1,
  newx : -1,
  newy : -1,
  blinking : false,
  trailTimer : 0
};

onkeydown = function(e){
  keyDown[e.which] = true;
  console.log(e.which);
}

onkeyup = function(e){
  keyDown[e.which] = false;
}

setInterval(update, 1000 / 60);
