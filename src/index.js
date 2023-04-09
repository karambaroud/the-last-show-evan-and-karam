import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import './index.css';
import App from './App';

import Empty from "./Empty";
import Overlay from "./Overlay";
import reportWebVitals from './reportWebVitals';
import Obituaries from './Obituaries';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
    <BrowserRouter>
      <Routes>
        <Route element={<App />}>
          <Route path ="/" element={<Empty/>} />
          <Route path ="/Obituaries" element={<Obituaries/> } />
          <Route path="/Overlay/:obitID/edit"  element = {<Overlay />} />
          
        </Route>
      </Routes>
    </BrowserRouter>
  </>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
