import { objctSize } from "../../utils/utils.basicfunctions.js"

export function PlayerCar(ctx, img, type){
  this.ctx = ctx;
  this.width = objctSize(35);
  this.height = objctSize(70);
  this.angle = 0;
  this.positionX = 0;
  this.positionY = 0;
  this.x = (ctx.canvas.width / 2) - (this.width / 2);
  this.y = ctx.canvas.height - this.height-20;
  this.crash = false;
  this.type = type;
  if(type == "image"){
    this.carImg = new Image();
    this.carImg.src = img
  };
};

PlayerCar.prototype.drawItem = function(){
  if(this.type == "image"){
    this.ctx.save()
    this.ctx.translate((this.x + this.width/2), (this.y + (this.height-this.height/4)))
    this.ctx.rotate(this.angle)
    this.ctx.translate(-(this.x + this.width/2),-(this.y + (this.height-this.height/4)))
    this.ctx.drawImage(this.carImg, this.x, this.y, this.width, this.height)
    this.ctx.restore()

  } else {
    this.ctx.save()
    this.ctx.translate((this.x + this.width/2), (this.y + (this.height-this.height/4)))
    this.ctx.rotate(this.angle)
    this.ctx.translate(-(this.x + this.width/2),-(this.y + (this.height-this.height/4)))
    this.ctx.fillStyle = "#0000ff";
    this.ctx.fillRect(this.x, this.y, this.width, this.height);
    this.ctx.restore()
  };
};

PlayerCar.prototype.newPosition = function(){
  this.x += this.positionX;
  this.y += this.positionY;
  this.x = Math.min(Math.max(this.x,(this.ctx.canvas.width*12)/100), this.ctx.canvas.width - (this.width + (this.ctx.canvas.width*12)/100));
  this.y = Math.min(Math.max(this.y, 0), this.ctx.canvas.height - this.height);
};

PlayerCar.prototype.carCrash = function(obstacle){
  let playerLeft = this.x;
  let playerRight = this.x + (this.width);
  let playerTop = this.y;
  let playerBottom = this.y + (this.height);
  let obstacleLeft = obstacle.x+2;
  let obstacleRight = obstacle.x + (obstacle.width-2);
  let obstacleTop = obstacle.y+2;
  let obstacleBotton = obstacle.y + (obstacle.height-2);
  let crash = true;
  if((playerTop > obstacleBotton) || (playerBottom < obstacleTop) || (playerLeft > obstacleRight) || (playerRight < obstacleLeft)){
    crash = this.crash;
  }
  return crash;
};

PlayerCar.prototype.restore = function(){
  this.x = (this.ctx.canvas.width / 2) - (this.width / 2);
  this.y = this.ctx.canvas.height - this.height-10;
  this.angle = 0;
};