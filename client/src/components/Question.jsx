import React from "react";
import PropTypes from "prop-types";
import { TextField, TextareaAutosize, Container } from "@material-ui/core";
import QuestionaireContext from "./QuestionaireContext";

class Question extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    event.persist();
    const { qId } = this.props;
    const { update } = this.context;
    const res = {};
    res[qId] = event.target.value;
    update(res);
  }

  getState() {
    const { qId } = this.props;
    const { data } = this.context;
    data[qId] = data[qId] || "";
    return data[qId];
  }

  render() {
    const { question } = this.props;
    return (
      <Container>
        <p>{question}</p>
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

Question.contextType = QuestionaireContext;

Question.propTypes = {
  question: PropTypes.string.isRequired,
  qId: PropTypes.string.isRequired,
};

export default Question;
