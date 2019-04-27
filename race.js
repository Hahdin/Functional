'use strict'


const movePositions = (carPositions) =>{
  return carPositions.map((x,i) => Math.random() > 0.3 ? x+1 : x )
}
const outputCarPosition = (carPosition) =>{
  let count = carPosition
  let rt = ''
  while(count--){
    rt += '-'
  }
  return rt;
}
const runStepOfRace = (state) =>{
  let hist = state['history'] !== undefined ? [...state['history']] : []
  return {
    time: state.time -1,
    carPositions: movePositions(state.carPositions),
    history: hist.concat({
      time:state.time, 
      carPositions:[...state.carPositions],
    })
  }
}

const drawState = (state) =>{
  console.log(`
    ${state.carPositions.map(outputCarPosition)}
  `)
}
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
race({
  time: 5,
  carPositions: [1,1,1],
})
