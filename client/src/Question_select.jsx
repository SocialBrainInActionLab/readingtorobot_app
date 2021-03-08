import React from 'react';
import PropTypes from 'prop-types';
import './App.css';
import {
  Box,
  TextField,
  TextareaAutosize,
  Container,
  FormControl,
  Radio,
  RadioGroup,
  FormControlLabel,
} from '@material-ui/core';

class QuestionSelect extends React.Component {
  constructor(props) {
    super(props);
    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleRadioChange = this.handleRadioChange.bind(this);
  }

  handleTextChange(event) {
    const { setData } = this.props;
    const data = this.getState();
    data.answer = event.target.value;
    setData(data);
  }

  handleRadioChange(event) {
    const { setData } = this.props;
    const data = this.getState();
    data.option = event.target.value;
    setData(data);
  }

  getState() {
    let { data: d } = this.props;
    if (!d) {
      d = { option: false, answer: '' };
    }
    return d;
  }

  render() {
    const { question, options } = this.props;
    const data = this.getState();
    return (
      <Container>
        <p>
          {question}
        </p>
        <form className="this" noValidate autoComplete="off">
          <FormControl component="fieldset">
            <RadioGroup
              row
              aria-label="option"
              name="option"
              defaultValue="top"
              value={data.option}
              onChange={this.handleRadioChange}
            >
              <FormControlLabel
                value={options[0]}
                control={<Radio color="primary" />}
                label={options[0]}
                labelPlacement="left"
              />
              <Box width="40px" />
              <FormControlLabel
                value={options[1]}
                control={<Radio color="primary" />}
                label={options[1]}
                labelPlacement="left"
              />
            </RadioGroup>
          </FormControl>
          <TextField
            fullWidth
            id="outlined-basic"
            variant="outlined"
            multiline={TextareaAutosize}
            value={data.answer}
            onChange={this.handleTextChange}
          />
        </form>
      </Container>
    );
  }
}

QuestionSelect.propTypes = {
  setData: PropTypes.func.isRequired,
  question: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  data: PropTypes.string,
};

QuestionSelect.defaultProps = {
  data: '',
};

export default QuestionSelect;
