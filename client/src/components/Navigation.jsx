import React from 'react';
import PropTypes from 'prop-types';
import {
  AppBar,
  Box,
  Button,
  MobileStepper,
  Typography,
} from '@material-ui/core';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';

export default class Navigator extends React.Component {
  constructor(props) {
    super(props);
    this.handleNext = this.handleNext.bind(this);
    this.handleBack = this.handleBack.bind(this);

    if (!props.layout) {
      this.layout = [
        <Typography variant="h6">No layout provided, please specify questionaire layout in index.js</Typography>,
      ];
    } else {
      this.layout = props.layout;
    }

    this.layout_length = this.layout.length;

    this.state = {
      current: 0,
    };
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
    const { isLoading: loading } = this.props;
    return (
      <Box position="sticky" height="85%" display="flex" flexDirection="column">
        <Box>
          {
            React.cloneElement(this.layout[c], {
              isLoading: loading,
            })
          }
          <Box height="10vh" />
        </Box>
        <AppBar position="fixed" style={{ top: 'auto', bottom: 0 }}>
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
  layout: PropTypes.arrayOf(PropTypes.element).isRequired,
  isLoading: PropTypes.func.isRequired,
};
