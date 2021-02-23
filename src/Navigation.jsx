import React from 'react';
import PropTypes from 'prop-types';
import './App.css';
import {
  AppBar,
  Box,
  Button,
  MobileStepper,
} from '@material-ui/core';
// import {Page} from './pages/page.js'
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import Question from './Question';

class Navigator extends React.Component {
  constructor(props) {
    super(props);
    if (!props.layout) {
      this.layout = [
        {
          dom: <Question question="Did you like the robot?" onSubmitResponse={this.handleResponse} />,
          data: {},
        },
        {
          dom: <Question question="Why not?" onSubmitResponse={this.handleResponse} />,
          data: {},
        },
      ];
    } else {
      this.layout = props.layout;
    }
    this.layout_length = this.layout.length;
    this.state = {
      current: 0,
    };

    this.handleNext = this.handleNext.bind(this);
    this.handleBack = this.handleBack.bind(this);
  }

  handleResponse(value) {
    const { current: c } = this.state;
    this.layout[c].data = value;
  }

  handleNext() {
    const { current: c } = this.state;
    this.setState({ current: c + 1 });
  }

  handleBack() {
    const { current: c } = this.state;
    this.setState({ current: c - 1 });
  }

  render() {
    const { current: c } = this.state;
    return (
      <Box height="85%" display="flex" flexDirection="column">
        <Box flex={1} overflow="auto">
          {this.layout[c].dom}
          <Box height="10vh" />
        </Box>
        <AppBar style={{ top: 'auto', bottom: 0 }}>
          <MobileStepper
            variant="progress"
            steps={this.layout_length}
            position="static"
            activeStep={c}
            className={this.root}
            nextButton={(
              <Button size="small" onClick={this.handleNext} disabled={c === this.layout_length - 1}>
                Next
                <KeyboardArrowRight />
              </Button>
            )}
            backButton={(
              <Button size="small" onClick={this.handleBack} disabled={c === 0}>
                <KeyboardArrowLeft />
                Back
              </Button>
            )}
          />
        </AppBar>
      </Box>
    );
  }
}

Navigator.propTypes = {
  layout: PropTypes.arrayOf(
    PropTypes.shape({
      dom: PropTypes.element,
      data: PropTypes.objectOf(PropTypes.any),
    }),
  ).isRequired,
};

export default Navigator;
