/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Question from './Question';
import RobotSelectionPage from './pages/select_robot';
import { ParticipantInfoPage } from './pages/participant_info';
import { MeetRobotsInactivePage } from './pages/meet_robots_inactive';
import { RobotVideoPage } from './pages/robot_video';

function shuffle(array) {
  const res = array;
  let currentIndex = array.length;
  let temporaryValue;
  let randomIndex;

  // While there remain elements to shuffle...
  while (currentIndex !== 0) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    res[currentIndex] = array[randomIndex];
    res[randomIndex] = temporaryValue;
  }

  return array;
}

let layout = [
  <ParticipantInfoPage />,
  <MeetRobotsInactivePage />,
];

layout = layout.concat(shuffle([
  <RobotVideoPage url="https://www.youtube.com/watch?v=7zDzibR9mzw" />,
  <RobotVideoPage url="https://www.youtube.com/watch?v=7zDzibR9mzw" />,
  <RobotVideoPage url="https://www.youtube.com/watch?v=7zDzibR9mzw" />,
]));

layout = layout.concat([
  <RobotSelectionPage />,
  <Question question="Did you like the robot?" />,
  <Question question="Why not?" />,
]);

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
