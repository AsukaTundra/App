import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";

import "./index.scss";
import store from "./store";
import App from "./app";

const root = ReactDOM.createRoot(document.querySelector("#root") as HTMLElement);
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
