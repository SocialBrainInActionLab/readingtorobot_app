import React from 'react';
import PropTypes from 'prop-types';
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
import QuestionaireContext from './QuestionaireContext';

class QuestionSelect extends React.Component {
  constructor(props) {
    super(props);
    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleRadioChange = this.handleRadioChange.bind(this);
  }

  handleTextChange(event) {
    const { qId } = this.props;
    const { update } = this.context;
    const data = this.getState();
    data[`${qId}_extended`] = event.target.value;
    update(data);
  }

  handleRadioChange(event) {
    const { qId } = this.props;
    const { update } = this.context;
    const data = this.getState();
    data[`${qId}_option`] = event.target.value;
    update(data);
  }

  getState() {
    const { qId } = this.props;
    const { data } = this.context;
    const s = {};
    s[`${qId}_option`] = data[`${qId}_option`] || false;
    s[`${qId}_extended`] = data[`${qId}_extended`] || '';
    return s;
  }

  render() {
    const { question, options, qId } = this.props;
    const s = this.getState();
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
              value={s[`${qId}_option`]}
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
            value={s[`${qId}_extended`]}
            onChange={this.handleTextChange}
          />
        </form>
      </Container>
    );
  }
}

QuestionSelect.contextType = QuestionaireContext;

QuestionSelect.propTypes = {
  question: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  qId: PropTypes.string.isRequired,
};

export default QuestionSelect;
