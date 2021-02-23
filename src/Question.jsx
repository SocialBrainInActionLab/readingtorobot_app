import React from 'react';
import PropTypes from 'prop-types';
import './App.css';
import { TextField, TextareaAutosize, Container } from '@material-ui/core';

class Question extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.onClick = this.onClick.bind(this);
    this.onSubmit = props.onSubmitResponse;
  }

  handleChange(event) {
    event.persist(); // allow native event access (see: https://facebook.github.io/react/docs/events.html)
    // give react a function to set the state asynchronously.
    // here it's using the "name" value set on the TextField
    // to set state.person.[firstname|lastname].
    this.setState({ value: event.target.value });
  }

  onClick() {
    const { value: res } = this.state;
    this.onSubmit(res);
  }

  render() {
    const { question } = this.props;
    const { value } = this.state;
    return (
      <Container>
        <p>
          {question}
        </p>
        <form className="this" noValidate autoComplete="off">
          <TextField
            fullWidth
            id="outlined-basic"
            variant="outlined"
            multiline={TextareaAutosize}
            value={value}
            onChange={this.handleChange}
          />
        </form>
      </Container>
    );
  }
}

Question.propTypes = {
  onSubmitResponse: PropTypes.func.isRequired,
  question: PropTypes.string.isRequired,
};

export default Question;
