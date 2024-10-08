export function eventListeners(elemt, action, func){
  elemt.addEventListener(action, func)
};

export function randomIntNum(max, min){
  return Math.floor(Math.random() * (max - min +1)) + min;
};

export function randomfltNum(max, min){
  const n = Math.random() * (max - min +1) + min;
  return Number(n.toFixed(2));
};

export function randomColor(){
  return `rgb(${randomIntNum(0, 255)},${randomIntNum(0, 255)},${randomIntNum(0, 255)})`;
};

export function randomArrayIndx(array){
  const index = Math.floor(Math.random()* array.length);
  return array[index]
};

export function objctSize(objMeasurement){
  let screen = document.getElementById("screen")
  if(screen.clientWidth >=290){
    return objMeasurement * 1.17;
  }else if(screen.clientWidth >=250){
    return objMeasurement;
  }else{
    return objMeasurement * 0.72
  };
};

export function lightOn(){
  const circleLight = document.getElementById("power-light-circle");
  circleLight.style.backgroundColor = "#46ff0e"
  circleLight.style.boxShadow = "0px 0px 4px #46ff0e, inset -1px 2px 1px #e6ffde"
};
export function lightOff(){
  const circleLight = document.getElementById("power-light-circle");
  circleLight.style.backgroundColor = "#0f3803"
  circleLight.style.boxShadow = "inset 1px -1px 2px #0a1a05, inset -1px 2px 1px #366f24"
};

export function axis(){
  let posX
  let posY
  let canv = document.getElementById("gameCanvas")
  canv.addEventListener("click", function(e){
    posX = e.offsetX
    posY = e.offsetY
    document.getElementById("input").value = `X: ${posX} | Y: ${posY}`
  })
};
