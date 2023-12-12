let globalCircleAngle = 0;	// initialize angle variable
let globalCircleRadius = 50;  // set the radius of circle
let globalCircleStartX = 100;	// set the x-coordinate for the circle center
let globalCircleStartY = 100;	// set the y-coordinate for the circle center
let globalCircleAngleStep = 0;

let subCircleAngle = 360;	// initialize angle variable
let subCircleRadius = 50;  // set the radius of circle
let subCircleStartX = 100;	// set the x-coordinate for the circle center
let subCircleStartY = 100;	// set the y-coordinate for the circle center
let subCircleAngleStep = 0;

let startPoint;
let sliderGlobal
let sliderSub

let myPicker;

function setup() {
  createCanvas(800, 800);

  background(0);
  angleMode(DEGREES);	// change the angle mode from radians to degrees

  globalCircleRadius = width / 4;

  // set circle center to canvas center
  globalCircleStartX = width / 2;
  globalCircleStartY = height / 2;

  startPoint = createVector(0, 0);

  myPicker = createColorPicker('deeppink');
  myPicker.position(width - 100, height);

  sliderGlobal = createSlider(0, 255, 122);
  sliderGlobal.position(0, height);
  globalCircleAngleStep = map(sliderGlobal.value(), 0, 255, 0.1, 2.5);

  sliderSub = createSlider(0, 255, 122);
  sliderSub.position(width / 4, height);
  subCircleAngleStep = map(sliderSub.value(), 0, 255, 1, 5);
}

function draw() {

  background(0, 2);

  let g = map(sliderGlobal.value(), 0, 255, 0.1, 2.5);
  if (globalCircleAngleStep != g) {
    background(0);
    loop();
  }
  globalCircleAngleStep = g;

  let gSub = map(sliderSub.value(), 0, 255, 0.9, 4.9);
  if (subCircleAngleStep != gSub) {
    background(0);
    loop();
  }
  subCircleAngleStep = gSub;

  let x = globalCircleStartX + globalCircleRadius * cos(globalCircleAngle);
  let y = globalCircleStartY + globalCircleRadius * sin(globalCircleAngle);

  // stroke(5);
  // color(0);
  // noFill();
  // ellipse(x, y, subCircleRadius);
  
  globalCircleAngle += globalCircleAngleStep;	// increment angle for the next frame

  let subX = x + subCircleRadius / 2 * cos(subCircleAngle);
  let subY = y + subCircleRadius / 2 * sin(subCircleAngle);

  if (startPoint.x == round(subX) && startPoint.y == round(subY)) {
    // set startpoint 
    noLoop();

    console.log('stop drawing')
  }

  let c = myPicker.color();

  noStroke();
  fill(c)
  ellipse(subX, subY, 2);
  
  if (startPoint.x == 0 && startPoint.y == 0) {
    // set startpoint 
    startPoint = createVector(subX, subY);

    console.log('set startpoint', startPoint)
  }

  subCircleAngle -= subCircleAngleStep;	// increment angle for the next frame

}
