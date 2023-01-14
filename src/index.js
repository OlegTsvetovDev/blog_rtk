import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import App from "./App";
import "./index.css";

import { store } from "./app/store";
import { fetchUsers } from "./features/users/usersSlice";
import { extendedApiSlice } from "./features/posts/postsSlice";

store.dispatch(extendedApiSlice.endpoints.getPosts.initiate());
store.dispatch(fetchUsers());

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/*" element={<App />} />
        </Routes>
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
