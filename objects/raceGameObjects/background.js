import {po} from "../../utils/utils.basicfunctions.js";

export function Bg(ctx, y, img, type){
  this.ctx = ctx
  this.type = type
  if(type == "image"){
    this.bgImage = new Image()
    this.bgImage.src = img
  }
  this.width = this.ctx.canvas.width;
  this.height = this.ctx.canvas.height;
  this.x = 0;
  this.y = y;
};

Bg.prototype.drawItem = function(){
  this.ctx;
  this.ctx.drawImage(this.bgImage, this.x, this.y, this.width, this.height);
};

Bg.prototype.update = function(array, score){
  for(let i = 0; i < array.length; i++){
    if(array[i].y < this.ctx.canvas.height + 20){
      array[i].y += score.speed - 0.5
      array[i].drawItem()
    } else {
      array.splice(i, 1);
      i--
    };
  }
};