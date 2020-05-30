// import React from 'react';
// import ReactDOM from 'react-dom';
// import './index.css';
// import App from './App';
// import * as serviceWorker from './serviceWorker';

// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root')
// );

// // If you want your app to work offline and load faster, you can change
// // unregister() to register() below. Note this comes with some pitfalls.
// // Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
const createStore = (reducer) => {
  let state;

  let listeners = [];

  const subscribe = (listener) => {
    listeners.push(listener)
    return () => {
      listeners = listeners.filter((l) => l !== listener)
    }
  }
  
  const getState = () => state

  const dispatch = (action) => {
    state = reducer(state, action);
    listeners.forEach((listener) => listener());
  }

  return {
    getState,
    subscribe, 
    dispatch
  }
}

//
const ADD_TODO = 'ADD_TODO';
const REMOVE_TODO = 'REMOVE_TODO';
const TOGGLE_TODO = 'TOGGLE_TODO';
const ADD_GOAL = 'ADD_GOAL';
const REMOVE_GOAL = 'REMOVE_GOAL';

const addTodoAction = todo => {
  return {
    type: ADD_TODO,
    todo,
  }
}

const removeTodoAction = id => {
  return {
    type: REMOVE_TODO,
    id,
  }
}

const toggleTodoAction = id => {
  return {
    type: TOGGLE_TODO,
    id,
  }
}

const addGoalAction = goal => {
  return {
    type: ADD_GOAL,
    goal,
  }
}

const removeGoalAction = id => {
  return {
    type: REMOVE_GOAL,
    id,
  }
}



const todos = (state = [], action) => {
  switch (action.type) {
    case ADD_TODO:
      return state.concat([action.todo]);
    case REMOVE_TODO:
      return state.filter((item) => item.id !== action.id)
    case TOGGLE_TODO:
      return state.map((item) => item.id !== action.id ? item :
      Object.assign({}, item, { complete: !item.complete}))
    default:
      return state;
  }
}

const goals = (state = [], action) => {
  switch (action.type) {
    case ADD_GOAL:
      return state.concat([action.goal]);
    case REMOVE_GOAL:
      return state.filter((item) => item.id !== action.id)
    default:
      return state;
  }
}

const app = (state = {}, action) => {
  return {
    todos: todos(state.todos, action),
    goals: goals(state.goals, action)
  }
}

const store = createStore(app);

store.subscribe(() => {
  console.log("state is: ", store.getState());
})

const unsubscribe = store.subscribe(() => {
  console.log("state changed");
})

store.dispatch(addTodoAction({
  'id' : 0,
  name: 'Learn React',
  complete: true
}));

unsubscribe();

store.dispatch(addGoalAction({
  'id' : 0,
  name: 'Become React Developer',
}));

store.dispatch(addTodoAction({
  'id' : 1,
  name: 'Learn Redux',
  complete: false,
}));

store.dispatch(addGoalAction({
  'id' : 1,
  name: 'Become CEO',
}));

store.dispatch(addGoalAction({
  'id' : 2,
  name: 'Become UI dev guru',
}));

store.dispatch(removeGoalAction(1));
store.dispatch(toggleTodoAction(1));
