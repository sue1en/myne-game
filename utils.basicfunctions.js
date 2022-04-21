export function randomIntNum(max, min){
  return Math.floor(Math.random() * (max - min +1)) + min;
};

export function randomColor(){
  return `rgb(${randomIntNum(0, 255)},${randomIntNum(0, 255)},${randomIntNum(0, 255)})`;
};

export function randomfltNum(max, min){
  const n = Math.random() * (max - min +1) + min;
  return Number(n.toFixed(2));
};

export function randomArrayIndx(array){
  const index = Math.floor(Math.random()* array.length);
  return array[index]
};

export function axis(){
  var posX
  var posY
  let canv = document.getElementById("gameCanvas")
  canv.addEventListener("click", function(e){
    posX = e.offsetX
    posY = e.offsetY
    document.getElementById("input").value = `X: ${posX} | Y: ${posY}`
  })
};

export function po(print){console.log(print)};