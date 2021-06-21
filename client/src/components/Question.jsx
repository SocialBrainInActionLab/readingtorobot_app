import React from 'react';
import PropTypes from 'prop-types';
import { TextField, TextareaAutosize, Container } from '@material-ui/core';

class Question extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    event.persist();
    const { setData, qId } = this.props;
    const res = {};
    res[qId] = event.target.value;
    setData(res);
  }

  getState() {
    const { data, qId } = this.props;
    data[qId] = data[qId] || '';
    return data[qId];
  }

  render() {
    const { question } = this.props;
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
            value={this.getState()}
            onChange={this.handleChange}
          />
        </form>
      </Container>
    );
  }
}

Question.propTypes = {
  setData: PropTypes.func.isRequired,
  question: PropTypes.string.isRequired,
  data: PropTypes.string.isRequired,
  qId: PropTypes.string.isRequired,
};

export default Question;
