'use strict'

/**
 * Randomly move a car
 * @param {array} carPositions 
 */
const movePositions = (carPositions) => {
  return carPositions.map((x, i) => Math.random() > 0.3 ? x + 1 : x)
}

/**
 * Output the current position
 * @param {number} carPosition 
 */
const outputCarPosition = (carPosition) => {
  let count = carPosition
  let rt = ''
  while (count--) {
    rt += '-'
  }
  return rt;
}

/**
 * Run a step of the race
 * @param {object} state 
 */
const runStepOfRace = (state) => {
  let hist = state['history'] !== undefined ? [...state['history']] : []
  return {
    ...state,
    time: state.time - 1,
    carPositions: movePositions(state.carPositions),
    history: hist.concat({//keep a history
      time: state.time,
      carPositions: [...state.carPositions],
    }),
  }
}

/**
 * Draw the current state of the race
 * @param {object} state 
 */
const drawState = (state) => {
  state.msgs.push(state.carPositions.map(outputCarPosition))
}
const runTheRace = (state) =>{
  let raceState = {...state, msgs:[]}
  race(raceState)
  return raceState
}
/**
 * Start the race
 * @param {object} state 
 */
const race = (state) => {
  drawState(state)
  if (state.time) {
    race(runStepOfRace(state))
  }
  else {
    state.msgs.push(
      `
    Win
    ======================
    `)
    state.msgs.push(`
    time: ${state.time}
    car Positions: ${state.carPositions}
    `)
    state.msgs.push(`
    History
    ======================
    `)
    state.msgs.push(state.history)
  }
}

/**
 * Print the race results (impure)
 * @param {object} state 
 */
const printResults = (state) => {
  let table = false
  state.msgs.forEach(msg => {
    let txt = msg
    if (Array.isArray(msg)) {
      txt = ''
      msg.forEach(i => txt += `${i},`)
    }
    table ? console.table(msg) : console.log(txt);
    if (!Array.isArray(msg) && msg.search(/history/i) >= 0) {
      table = true;
    }
  })
}

//Run a race
printResults(
  runTheRace(
  {
    time: 20,
    carPositions: [1, 1, 1],
    msgs: [],
  })
)
