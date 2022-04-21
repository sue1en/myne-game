export function GameOver(ctx){
  this.x = ctx.canvas.width/2;
  this.y = ctx.canvas.height/2;
  this.font = "bold 40px arial"
  this.textAlign = "center"
  this.textBaseline = "middle"
  this.color = "rgba(255, 255, 255, 0.90)"

  this.drawItem = function(){
    ctx.font = this.font;
    ctx.textAlign = this.textAlign;
    ctx.textBaseline = this.textBaseline
    ctx.fillStyle = this.color;
    ctx.fillText("Game Over", this.x, this.y)
    ctx.strokeText("Game Over", this.x, this.y)
  }
};