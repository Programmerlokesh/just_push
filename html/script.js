// select dom elements
const mainContainer = document.querySelector(".all-matches");
const matchRow = document.querySelector(".match");
const addButton = document.querySelector(".btn");
const matchValue = document.querySelector(".lws-singleResult");
const incrementValue = document.querySelector(".lws-increment");
const decrementValue = document.querySelector(".lws-decrement");
const resetBtn = document.querySelector(".lws-reset");
// const deleteBtn = document.querySelector(".lws-delete");

addButton.addEventListener("click", () => {
  const rowCount = mainContainer.children.length;
  const cloneElement = matchRow.cloneNode(true);
  const matchName = cloneElement.querySelector(".lws-matchName");
  matchName.innerText = `match ${rowCount + 1}`;
  mainContainer.insertAdjacentHTML("beforeend", cloneElement.outerHTML);
});

// deleteBtn.addEventListener("click", () => {
//   const cloneElement = matchRow.cloneNode(true);
//   const deleteMatch = cloneElement.querySelector(".match");
//   deleteMatch.remove();
// });

// Start redux business logic

// action identifiers
const INCREMENT = "increment";
const DECREMENT = "decrement";
const RESET = "reset";

// action creators
const increment = (value) => {
  return {
    type: INCREMENT,
    payload: value,
  };
};

const decrement = (value) => {
  return {
    type: DECREMENT,
    payload: value,
  };
};

const reset = () => {
  return {
    type: RESET,
  };
};

// initial state
const initialState = {
  value: 0,
};

const counterReducer = (state = initialState, action) => {
  if (action.type === INCREMENT) {
    return {
      ...state,
      value: state.value + action.payload,
    };
  } else if (action.type === DECREMENT) {
    return {
      ...state,
      value: state.value - action.payload,
    };
  } else if (action.type === RESET) {
    return {
      ...state,
      value: (state.value = 0),
    };
  } else {
    return state;
  }
};

// create store
const store = Redux.createStore(counterReducer);

const render = () => {
  const state = store.getState();
  matchValue.innerText = state.value;
  if (state.value < 0) {
    matchValue.innerText = 0;
    if (state.value > 0) {
      matchValue.innerText = state.value;
    }
  }
};

// update UI initially
render();

store.subscribe(render);

incrementValue.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    store.dispatch(increment(Number(incrementValue.value)));
    e.target.value = "";
  }
});
decrementValue.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    store.dispatch(decrement(Number(decrementValue.value)));
    e.target.value = "";
  }
});

resetBtn.addEventListener("click", () => {
  store.dispatch(reset());
});
