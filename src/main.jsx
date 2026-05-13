import React from "react";
import ReactDOM from "react-dom/client";
import App from "../greenplant.jsx";
import AppEn from "../greenplant_en.jsx";
import "./index.css";

const path = window.location.pathname;
const isEnglish = path.startsWith('/en');

if (isEnglish) {
  document.documentElement.lang = "en";
  document.title = "Green Plant Technologies | Biogas Plant Project Preparation";
  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) metaDesc.setAttribute("content", "We design and build industrial and agricultural biogas plants. We transform biomass into a stable energy source.");
  const ogTitle = document.querySelector('meta[property="og:title"]');
  if (ogTitle) ogTitle.setAttribute("content", "Green Plant Technologies | Biogas Plant Projects");
  const ogDesc = document.querySelector('meta[property="og:description"]');
  if (ogDesc) ogDesc.setAttribute("content", "Preparation of agricultural and municipal biogas plant projects. Design, construction, and technical support.");
}

const Root = isEnglish ? AppEn : App;

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>
);
