import React from 'react';
import './App.css';
import { TextField, TextareaAutosize, Button } from '@material-ui/core';


class Question extends React.Component {
  constructor(props) {
    super(props);
    this.question = props.question;
    this.state = {
      value: ""
    }
    this.handleChange = this.handleChange.bind(this);
    this.onClick = this.onClick.bind(this);
  }

  handleChange(event) {
    event.persist(); // allow native event access (see: https://facebook.github.io/react/docs/events.html)
    // give react a function to set the state asynchronously.
    // here it's using the "name" value set on the TextField
    // to set state.person.[firstname|lastname].
    this.setState({value: event.target.value});
}

  onClick() {
    alert('An essay was submitted: ' + this.state.value);
  }

  render () {
    return (
      <header className="App-header">
        <p>
          {this.question}
        </p>
        <form className="this" noValidate autoComplete="off">
          <TextField
            fullWidth
            id="outlined-basic"
            variant="outlined"
            multiline={TextareaAutosize}
            value={this.state.value}
            onChange={this.handleChange}/>
        </form>
        <Button onClick={this.onClick}>Next</Button>
      </header>
    )
  }
}


function App() {
  return (
    <div className="App">
      <Question question="Did you like the robot?"/>
    </div>
  );
}

export default App;
