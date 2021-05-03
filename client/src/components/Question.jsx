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
    const { setData } = this.props;
    setData(event.target.value);
  }

  render() {
    const { question } = this.props;
    const { data: value } = this.props;

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
  setData: PropTypes.func.isRequired,
  question: PropTypes.string.isRequired,
  data: PropTypes.string,
};

Question.defaultProps = {
  data: '',
};

export default Question;
