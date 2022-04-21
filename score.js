export function Score(ctx){
  this.x = 40;
  this.y = 30;
  this.color = "rgba(15, 15, 15, 0.70)";
  this.font = "bold 20px arial";
  this.points = 0;
  this.multiplier = true;
  this.speed = 2;

  this.drawItem = function(){
    ctx.fillStyle = this.color;
    ctx.font = this.font;
    ctx.fillText(String(this.points).padStart(5, "0"), this.x, this.y);
  };

  this.updateByTime = function(player){
    if(player.crash == true) return;
     this.points += 1;
     this.multiplier = true;
  };

  /* |__Update Score By Obstacle-Car Position__|
  this.updateByPosition = function(player, obst){
    if(player.crash == true) return;
    let carBottom = Number(player.y + player.height);
    for(let i = 0; i < obst.length; i++){
      if((obst[i].y) > carBottom - 5 && carBottom > (obst[i].y)){
        this.points += 5;
        this.multiplier = true;
      }
    }
  };
  */

  this.updateSpeed = function(){
    if(this.points > 0 && this.points % 20 == 0 && this.multiplier){
      this.speed+=1
      this.multiplier = false
    } 
  };

  this.restore = function(){
    this.points = 0
    this.speed = 2;
    this.multiplier = true;
  };
};