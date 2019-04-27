'use strict'

/**
 * Randomly move a car
 * @param {array} carPositions 
 */
const movePositions = (carPositions) =>{
  return carPositions.map((x,i) => Math.random() > 0.3 ? x+1 : x )
}

/**
 * Output the current position
 * @param {number} carPosition 
 */
const outputCarPosition = (carPosition) =>{
  let count = carPosition
  let rt = ''
  while(count--){
    rt += '-'
  }
  return rt;
}

/**
 * Run a step of the race
 * @param {object} state 
 */
const runStepOfRace = (state) =>{
  let hist = state['history'] !== undefined ? [...state['history']] : []
  return {
    time: state.time -1,
    carPositions: movePositions(state.carPositions),
    history: hist.concat({//keep a history
      time:state.time, 
      carPositions:[...state.carPositions],
    })
  }
}

/**
 * Draw the current state of the race
 * @param {object} state 
 */
const drawState = (state) =>{
  console.log(`
    ${state.carPositions.map(outputCarPosition)}
  `)
}

/**
 * Start the race
 * @param {object} state 
 */
const race = (state) =>{
  drawState(state)
  if (state.time){
    race(runStepOfRace(state))
  }
  else{
    console.log(`
    Win
    ======================
    `)
    console.table(`
    time: ${state.time}
    car Positions: ${state.carPositions}
    `)
    console.log(`
    History
    ======================
    `)
    console.table(state.history)
  }
}

//Run a race
race({
  time: 15,
  carPositions: [1,1,1],
})
