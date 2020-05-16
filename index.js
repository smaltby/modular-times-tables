const SIZE = Math.min(window.innerWidth, window.innerHeight)
const HALF_SIZE = SIZE / 2

const DEFAULT_STEPS = 1000
const DEFAULT_MIN_STEPS = 10
const DEFAULT_MAX_STEPS = 1000

const DEFAULT_TIMES = 286
const DEFAULT_MIN_TIMES = 2
const DEFAULT_MAX_TIMES = 350

const DEFAULT_STEP = 0.01

let maxStepsDisplay;
let maxStepsInput;
let maxTimesDisplay;
let maxTimesInput;
let stepDisplay;
let stepInput;
let stepsDisplay;
let stepsSlider;
let timesDisplay;
let timesSlider;
let playCheckbox;

function setup() {
  createCanvas(SIZE, SIZE);

  maxStepsDisplay = createP("Max Steps")
  maxStepsInput = createInput(DEFAULT_MAX_STEPS.toString(), "number")
  maxTimesDisplay = createP("Max Times")
  maxTimesInput = createInput(DEFAULT_MAX_TIMES.toString(), "number")
  stepDisplay = createP("Step")
  stepInput = createInput(DEFAULT_STEP.toString(), "number")
  stepsDisplay = createP()
  stepsSlider = createSlider(DEFAULT_MIN_STEPS, DEFAULT_MAX_STEPS, DEFAULT_STEPS)
  stepsSlider.style('width', HALF_SIZE + 'px')
  timesDisplay = createP()
  timesSlider = createSlider(DEFAULT_MIN_TIMES, DEFAULT_MAX_TIMES, DEFAULT_TIMES, DEFAULT_STEP)
  timesSlider.style('width', HALF_SIZE + 'px')
  playCheckbox = createCheckbox('Play', false)
}

let time = 0

function draw() {
  background(255);

  circle(HALF_SIZE, HALF_SIZE, SIZE)

  const maxSteps = maxStepsInput.value()
  const maxTimes = maxTimesInput.value()
  const step = float(stepInput.value())

  stepsSlider.elt.max = maxSteps
  timesSlider.elt.max = maxTimes
  timesSlider.elt.step = step

  if (playCheckbox.checked()) {
    time += deltaTime * 0.001
    if (time > 0.01) {
      timesSlider.value(timesSlider.value() + step)
      time -= 0.01
    }
  }

  const steps = stepsSlider.value()
  const times = timesSlider.value()

  stepsDisplay.html('Steps: ' + steps)
  timesDisplay.html('Times: ' + times)

  for (let from = 0; from < steps; ++from) {
    const to = (from * times) % steps

    const fromCoords = getCoords(from, steps)
    const toCoords = getCoords(to, steps)

    const green = map(from, 0, steps, 0, 200)
    stroke(0, green, 100)
    line(fromCoords.x, fromCoords.y, toCoords.x, toCoords.y)
  }
}

function getCoords(step, steps) {
  const rotation = map(step, 0, steps, 0, TWO_PI)
  const deltaX = cos(rotation) * HALF_SIZE
  const deltaY = sin(rotation) * HALF_SIZE
  const x = HALF_SIZE + deltaX
  const y = HALF_SIZE + deltaY

  return createVector(x, y)
}