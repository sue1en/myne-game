import {randomColor, randomArrayIndx, objctSize, po} from "../../utils/utils.basicfunctions.js";
import { obstCarsImgs } from "../../lists/obstacle.list.js";

export function Obstacles(ctx, x, y, type){
  this.ctx = ctx;
  this.type = type;
  this.x = x;
  this.y = y;
  if(this.type == "image"){
    let arrItem = randomArrayIndx(obstCarsImgs)
    this.carImage = new Image();
    this.carImage.src = arrItem.imgSrc;
    this.height = objctSize(arrItem.height);
    this.width = objctSize(arrItem.width);
  }else{
    this.color = randomColor();
    this.height = 70;
  };
};

Obstacles.prototype.drawItem = function(){
    if(this.type == "image"){
      this.ctx.drawImage(this.carImage, this.x, this.y, this.width, this.height);
    } else {
      this.ctx.fillStyle = this.color;
      this.ctx.fillRect(this.x, this.y, this.width, this.height);
    }
  };

Obstacles.prototype.update = function(array, score){
  for(let i = 0; i < array.length; i++){
    if(array[i].y < this.ctx.canvas.clientHeight + array[i].height){
      array[i].y += score.speed +0.05
      array[i].drawItem();
    } else {
      array.splice(i, 1);
      i--
    };    
  };
};

Obstacles.prototype.restore = function(){
  this.x = x;
  this.y = y;
};