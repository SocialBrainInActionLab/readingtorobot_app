/* eslint-disable import/prefer-default-export */
import React from "react";
import PropTypes from "prop-types";

const QuestionaireContext = React.createContext();

class QuestionaireProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = { data: JSON.parse(localStorage.getItem("data")) };
    this.update = this.update.bind(this);
  }

  update(newData) {
    const { data } = this.state;
    const newd = { ...data, ...newData };
    this.setState({ data: newd });
    localStorage.setItem("data", JSON.stringify(newd));
  }

  render() {
    const { children } = this.props;
    const { data } = this.state;
    const { update } = this;

    return (
      <QuestionaireContext.Provider
        value={{
          data,
          update,
        }}
      >
        {children}
      </QuestionaireContext.Provider>
    );
  }
}

QuestionaireProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

export default QuestionaireContext;

export { QuestionaireProvider };
