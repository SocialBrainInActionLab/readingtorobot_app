/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {
  STAI,
  ParticipantInfoPage,
  RobotSelectionPage,
  RobotVideoPage,
  RobotVideoQuestionsPage,
  DemoPage1,
  DemoPage2,
  DemoPage3,
  DemoPage4,
  RobotRating,
} from './pages';
import { IntensityButtons, QuestionaireProvider } from './components';
import { shuffle } from './utils';

const robotVideos = {
  miro: [
    <RobotVideoPage url="https://youtu.be/wtaOtL8-RF8" />,
    <RobotVideoQuestionsPage name="miro" />,
  ],
  cozmo: [
    <RobotVideoPage url="https://youtu.be/8LWp_GPMsoc" />,
    <RobotVideoQuestionsPage name="cozmo" />,
  ],
  nao: [
    <RobotVideoPage url="https://youtu.be/f40EYuccxRg" />,
    <RobotVideoQuestionsPage name="nao" />,
  ],
};

function getVideos() {
  let videos = JSON.parse(localStorage.getItem('videos'));
  let res = [];
  if (videos == null) {
    videos = shuffle(['miro', 'cozmo', 'nao']);
    localStorage.setItem('videos', JSON.stringify(videos));
  }
  videos.forEach((vid) => { res = [...res, ...robotVideos[vid]]; });
  return res;
}

let layout = [
  <ParticipantInfoPage />,
  <RobotRating qId="rating1" />,
];

layout = layout.concat(getVideos());

layout = layout.concat([
  <RobotRating qId="rating2" />,
  <STAI qId="stai1" />,
  <RobotSelectionPage />,
  <STAI qId="stai2" />,
  <DemoPage1 />,
  <IntensityButtons qId="q2" question="How helpful was this robot?" />,
  <DemoPage2 />,
  <DemoPage3 />,
  <IntensityButtons qId="q9" question="How much did you enjoy reading with the robot?" />,
  <DemoPage4 />,
]);

ReactDOM.render(
  <React.StrictMode>
    <QuestionaireProvider>
      <App layout={layout} />
    </QuestionaireProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
