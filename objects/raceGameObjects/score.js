export function Score(ctx){
  this.ctx = ctx;
  this.x = (this.ctx.canvas.width*12)/100;
  this.y = 30;
  this.color = "rgba(15, 15, 15, 0.70)";
  this.font = "bold 20px arial";
  this.points = 0;
  this.multiplier = true;
  this.speed = 2;
};

Score.prototype.drawItem = function(){
  this.ctx.fillStyle = this.color;
  this.ctx.font = this.font;
  this.ctx.fillText(String(this.points).padStart(5, "0"), this.x, this.y);
};

Score.prototype.updateByTime = function(player){
  if(player.crash == true) return;
   this.points += 1;
   this.multiplier = true;
};

/* |__Update Score By Obstacle-Car Position__|
Score.prototype.updateByPosition = function(player, obst){
  if(player.crash == true) return;
  let carBottom = player.y + player.height;
  for(let i = 0; i < obst.length; i++){
    if((obst[i].y) > carBottom - 5 && carBottom > (obst[i].y)){
      this.points += 5;
      this.multiplier = true;
    }
  }
};
*/

Score.prototype.updateSpeed = function(){
  if(this.points > 0 && this.points % 20 == 0 && this.multiplier){
    if(this.speed < 15){
      this.speed += 0.5;
      this.multiplier = false
    }
  } 
};

Score.prototype.restore = function(){
  this.points = 0
  this.speed = 2;
  this.multiplier = true;
};