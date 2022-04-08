function Obstacles(ctx, x, y, color){
  this.width = 40;
  this.height = 70;
  this.x = x;
  this.y = y;
  this.color = color;
  this.update = function(){
    // ctx = document.getElementById("gameCanvas").getContext("2d");
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
  };
  this.restore = function(){
    this.x = x;
    this.y = y;
  };
};

export {
  Obstacles
}