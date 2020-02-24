import React from 'react';
import ReactDOM from 'react-dom';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from './src/reducers/index';
import uuid from 'uuid4';

import App from './app';

const initialState = {
  questions: [
  {
    "id": "418123e3-240d-49c2-b9e3-6c9e61c5e70e",
    "question": "Capital Of India?",
    "image": "",
    "options": {
      "a": "Delhi",
      "b": "Hyderabad",
      "c": "Noida",
    }
  },
  {
    "id": "ee5e18be-0c9c-489a-82f1-72bd0388c420",
    "question": "Capital Of US?",
    "image": "",
    "options": {
      "a": "Washington",
      "b": "Texas",
      "c": "Delhi",
    }
  }
]
}

const middleWare = applyMiddleware(thunk);
let store = createStore(
  rootReducer,
  initialState,
  middleWare
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);