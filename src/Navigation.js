import React from 'react';
import './App.css';
import { TextField, TextareaAutosize, Button } from '@material-ui/core';
import {Question} from './Question.js'

class Navigator extends React.Component {
  constructor(props) {
    super(props);
    this.question = [{question: "Did you like the robot?", id: 0},
                     {question: "Why not?", id: 1}];
    this.state = {
      current: 0,
      response: "",
    }
  }

  handleResponse = (value) => {
    this.setState({response: value})
    this.forceUpdate();
  }

  render () {
    return (
    <body>
        <Question question={this.question[this.state.current].question} onSubmitResponse={this.handleResponse}/>
        <p>
        {this.state.response}
        </p>
    </body>
    )
  }
}

export {Navigator}
