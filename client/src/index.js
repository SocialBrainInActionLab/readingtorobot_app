/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Question from './Question';
import RobotSelectionPage from './pages/select_robot';

const layout = [
  <RobotSelectionPage />,
  <Question question="Did you like the robot?" />,
  <Question question="Why not?" />,
];

ReactDOM.render(
  <React.StrictMode>
    <App layout={layout} />
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();