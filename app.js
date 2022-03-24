const screen = document.getElementById("screen");
var player
var ctx

function startGame(){
  if(!document.getElementById("gameCanvas")){
    console.log("Criar canvas");
    gameArea();
    ctx = document.getElementById("gameCanvas").getContext("2d");
    player = new playerCar(ctx);
  }else{
    console.log("Fazer nada");
  }
};

// Cria Game Area
function gameArea(){
  var newCanvas = document.createElement("canvas");
  newCanvas.id ="gameCanvas";
  newCanvas.width = screen.clientWidth;
  newCanvas.height = screen.clientHeight;
  screen.appendChild(newCanvas);
  newCanvas.interval = setInterval(updateCanvas, 2)
  ctrl(miniGameBtn.btnUp, "mousedown", gameControlls.moveUp)
  window.addEventListener("keydown", function(e){
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
  }, true);
  window.addEventListener('keyup', function(e){
    gameControlls.clearMove()
  });
};

// Limpa Game Area
function clearGameArea(){
  let canvas = document.getElementById("gameCanvas");
  let context = canvas.getContext("2d");
  context.clearRect(0, 0, canvas.width, canvas.height)
};

// Cria Player Car
function playerCar(ctx){
  this.width = 30;
  this.height = 60;
  this.positionX = 0;
  this.positionY = 0;
  this.x = Number((ctx.canvas.width / 2) - (this.width / 2));
  this.y = Number(ctx.canvas.height - this.height);
  this.update = function(){
    ctx.beginPath();
    ctx.fillRect(this.x, this.y, this.width, this.height);
  };
  this.newPosition = function(){
    this.x += this.positionX;
    this.y += this.positionY;
  };
};

function updateCanvas(){
  clearGameArea(); 
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

const miniGameBtn = {
  btnUp: document.getElementById("btn-direct-up"),
  btnDown: document.getElementById("btn-direct-down"),
  btnLeft: document.getElementById("btn-direct-left"),
  btnRight: document.getElementById("btn-direct-right"),
};

function ctrl(elemt, act, func){
  elemt.addEventListener(act, func)
}

/*
  Inserir imagem do carro
  carImage = new Image();
  carImage.src = "images/pixel-car.png";
  carImage.width = 30;
  carImage.height = 60;
  ctx.drawImage(carImage, this.x(), this.y(), this.width, this.height)

  ctx.fillStyle = "#0000ff";
  console.log(carImage)
*/

// Cria Game Area
// var gameArea = {
//   newCanvas: document.createElement("canvas"),
//   test:function(){console.log( this.newCanvas)},
//   start: function(){
//     this.newCanvas.id = "gameCanvas";
//     this.newCanvas.width = screen.clientWidth;
//     this.newCanvas.height = screen.clientHeight;
//     this.context = this.newCanvas.getContext("2d");
//     screen.appendChild(this.newCanvas);
//   } 
// };
