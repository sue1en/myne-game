const screen = document.getElementById("screen");
var newCanvas
var ctx
var player
var obstacleGroup = []

function axis(){
  var posX
  var posY
  let canv = document.getElementById("gameCanvas")
  canv.addEventListener("click", function(e){
    posX = e.offsetX
    posY = e.offsetY
    document.getElementById("input").value = `X: ${posX} | Y: ${posY}`
  })
};

function startGame(){
  if(!document.getElementById("gameCanvas")){
    console.log("Criar canvas");
    gameArea.start();
    var canvas = document.getElementById("gameCanvas");
    ctx = canvas.getContext("2d");
    player = new playerCar(ctx, "images/pixel-car.png", "image");

    axis()
  }else{
    console.log("Fazer nada");
  }
};

// Cria Game Area
var gameArea = {
  newCanvas: document.createElement("canvas"),
  start: function(){
    this.newCanvas.id ="gameCanvas";
    this.newCanvas.width = screen.clientWidth;
    this.newCanvas.height = screen.clientHeight;
    screen.appendChild(this.newCanvas);
    this.frameCount = 0;
    this.interval = setInterval(updateCanvas, 1);
    eventListeners(window, "mousedown", actionByBtn);
    eventListeners(window, "mouseup", gameControlls.clearMove);
    eventListeners(window, "touchstart", actionByBtn);
    eventListeners(window, "touchend", gameControlls.clearMove)
    eventListeners(window, "keydown", actionByKey);
    eventListeners(window, "keyup",  gameControlls.clearMove);
  },
  stop: function(){
    clearInterval(this.interval)
  }
};

// Limpa Game Area
function clearGameArea(){
  let canvas = document.getElementById("gameCanvas");
  let context = canvas.getContext("2d");
  context.clearRect(0, 0, canvas.width, canvas.height)
};

// Cria Player Car
function playerCar(ctx, img, type){
  this.width = 30;
  this.height = 60;
  this.positionX = 0;
  this.positionY = 0;
  this.x = Number((ctx.canvas.width / 2) - (this.width / 2));
  this.y = Number(ctx.canvas.height - this.height);
  this.type = type;
  if(type == "image"){
    this.carImg = new Image();
    this.carImg.src = img
  }
  this.update = function(){
    ctx;
    if(type == "image"){
      ctx.drawImage(this.carImg, this.x, this.y, this.width, this.height)
    } else{
      ctx.fillStyle = "#0000ff";
      ctx.fillRect(this.x, this.y, this.width, this.height);
    }
  };
  this.newPosition = function(){
    this.x += this.positionX;
    this.y += this.positionY;
    this.x = Math.min(Math.max(this.x, 0), ctx.canvas.width - this.width);
    this.y = Math.min(Math.max(this.y, 0), ctx.canvas.height - this.height);
  };
  this.carCrash = function(obstacle){
    var playerLeft = this.x;
    var playerRight = this.x + (this.width);
    var playerTop = this.y;
    var playerBottom = this.y + (this.height);
    var obstacleLeft = obstacle.x;
    var obstacleRight = obstacle.x + (obstacle.width);
    var obstacleTop = obstacle.y;
    var obstacleBotton = obstacle.y + (obstacle.height);
    var crash = true;
    if((playerTop > obstacleBotton) || (playerBottom < obstacleTop) || (playerLeft > obstacleRight) || (playerRight < obstacleLeft)){
      crash = false;
    }
    // po(crash)
    return crash;
  }
};

function obstacles(x, y){
  this.width = 20;
  this.height = 40;
  this.positionX = 0;
  this.positionY = 0;
  this.x = x;
  this.y = y;
  this.update = function(){
    ctx = document.getElementById("gameCanvas").getContext("2d");
    ctx.fillStyle = "#0000ff";
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
  this.newPosition = function(){
    this.x += this.positionX;
    this.y += this.positionY;
  }
};

function everyinterval(n) {
  if ((gameArea.frameCount / n) % 1 == 0) {return true;}
  return false;
}

//TODO: deixar intervalo mais variado; variar posição dos obstaculos(esqueda/direita); limitar área da pista para obstáculos.


function createObstacles(){
  var x, y;
  gameArea.frameCount += 1;
  if(gameArea.frameCount == 1 || everyinterval(300)){
    x = gameArea.newCanvas.width-100;
    y = 0;
    obstacleGroup.push(new obstacles(x, y))
  };
  for(i=0; i < obstacleGroup.length; i++){
    obstacleGroup[i].y += 0.5;
    obstacleGroup[i].update();
  }
};

function updateCanvas(){
  for(i=0; i < obstacleGroup.length; i++){
    if(player.carCrash(obstacleGroup[i])){
      po("BATEU!!!")
      gameArea.stop();
      return
    };
  };  
  clearGameArea();
  createObstacles()
  player.newPosition();
  player.update();
};

const gameControlls = {
  moveLeft: function(){player.positionX -= 1},
  moveRight: function(){player.positionX += 1},
  moveUp: function(){player.positionY -= 1},
  moveDown: function(){player.positionY += 1},
  clearMove: function(){player.positionX = 0, player.positionY = 0}
};

const consoleBtn = {
  btnUp: document.getElementById("btn-direct-up"),
  btnDown: document.getElementById("btn-direct-down"),
  btnLeft: document.getElementById("btn-direct-left"),
  btnRight: document.getElementById("btn-direct-right"),
};

function eventListeners(elemt, action, func){
  elemt.addEventListener(action, func)
};

function actionByBtn(e){
  if(e.defaultPrevented) {
    return; // Do nothing if event already handled
  };
  switch(e.target){
    case consoleBtn.btnLeft:
      gameControlls.moveLeft();
      break;
    case consoleBtn.btnRight:
      gameControlls.moveRight();
      break;
    case consoleBtn.btnUp:
      gameControlls.moveUp();
      break;
    case consoleBtn.btnDown:
      gameControlls.moveDown();
      break;
    };
    e.preventDefault();
};
    
function actionByKey(e){
  if(e.defaultPrevented) {
    return; // Do nothing if event already handled
  };
  switch(e.code){
    case "ArrowLeft":
      gameControlls.moveLeft();
      break;
    case "ArrowRight":
      gameControlls.moveRight();
      break;
    case "ArrowUp":
      gameControlls.moveUp();
      break;
    case "ArrowDown":
      gameControlls.moveDown();
      break;
  };
  e.preventDefault();
};

function po(print){console.log(print)}