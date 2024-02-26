import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { PodcastContextWrapper } from "./store/podcast-context.jsx";
import { CategoryContextWrapper } from "./store/category-context.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <PodcastContextWrapper>
    <CategoryContextWrapper>
      <App />
    </CategoryContextWrapper>
  </PodcastContextWrapper>
);
