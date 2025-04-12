import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import { Toaster } from "react-hot-toast";
import { Provider } from 'react-redux';
import {store} from "../src/redux/store"

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Provider store={store}>
    <Toaster position="top-center" reverseOrder={false} />
      <App />
      </Provider>
    </BrowserRouter>
  </StrictMode>
);


