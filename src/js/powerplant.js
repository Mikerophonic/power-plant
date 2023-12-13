const changeState = (prop) => {
  return (value) => {
    return (state) => ({
      ...state,
      [prop] : (state[prop] || 0) + value
    })
  }
}

const feed = changeState("soil");
const hydrate = changeState("water")(5);
const giveLight = changeState("light");

const blueFood = changeState("soil")(5);

const decreaseSoil = changeState("soil")(-1);
const decreaseWater = changeState("water")(-1);

const storeState = () => {
  let currentState = {};
  return (stateChangeFunction = state => state) => {
    const newState = stateChangeFunction(currentState);
    currentState = {...newState};
    return newState;
  }
}

const stateControl = storeState();

const updateSoilValue = () => {
  const currentState = stateControl();
  document.getElementById('soil-value').innerText = `Soil: ${currentState.soil}`;
  document.getElementById('water-value').innerText = `Water: ${currentState.water}`;

};

setInterval(() => {
  stateControl(decreaseSoil);
  stateControl(decreaseWater);
  updateSoilValue();
}, 1000);

window.onload =  function() {
  // This function has side effects because we are manipulating the DOM.
  // Manipulating the DOM will always be a side effect. 
  // Note that we only use one of our functions to alter soil. 
  // You can easily add more.
  document.getElementById('feed').onclick = function() {
    const newState = stateControl(blueFood);
    document.getElementById('soil-value').innerText =  `Soil: ${newState.soil}`;
  };

  document.getElementById('water').onclick = function() {
    const newState = stateControl(hydrate);
    document.getElementById('water-value').innerText =  `Water: ${newState.water}`;
  };
  // This function doesn't actually do anything useful in this application 
  // — it just demonstrates how we can "look" at the current state 
  // (which the DOM is holding anyway). 
  // However, students often do need the ability to see the current state 
  // without changing it so it's included here for reference.
  document.getElementById('show-state').onclick = function() {
    // We just need to call stateControl() without arguments 
    // to see our current state.
    const currentState = stateControl();
    document.getElementById('soil-value').innerText = `Soil: ${currentState.soil}`;
  };
};