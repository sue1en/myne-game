export function Score(ctx){
  this.x = 20;
  this.y = 30;
  this.color = "rgba(15, 15, 15, 0.70)";
  this.font = "bold 20px arial";
  this.value = 0;
  this.drawItem = function(){
    ctx.fillStyle = this.color;
    ctx.font = this.font
    ctx.fillText(this.value, this.x, this.y);
  };

  this.update = function(player, obst){
    if(player.crash == true) return;
    let carBottom = Number(player.y + player.height);
    for(let i = 0; i < obst.length; i++){
      if(carBottom == (obst[i].y)){
        this.value+= 5
      }
    }
  };

  this.restore = function(){
    this.value = 0
  };
};