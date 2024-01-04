import React from "react";
import ReactDOM from "react-dom/client";
import "./input.css";
import App from "./App";
import { Provider } from "react-redux"; // Correct import statement
import { store } from "./redux/store";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>gcd frontend
);
