import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";

import initState from "./redux/initState";
import itemsReducer from "./redux/reducers/itemsReducer";

const store = createStore(
  itemsReducer,
  initState(),
  composeWithDevTools(applyMiddleware())
);
store.subscribe(() => {
  window.localStorage.setItem("knowledge", JSON.stringify(store.getState()));
});
ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
