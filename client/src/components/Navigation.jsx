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

import Page from './Page';
import ReusablePage from './ReusablePage';

export default class Navigator extends React.Component {
  static getDefaultResults(elements) {
    let r = {};
    elements.forEach((element) => {
      if (element.type.prototype instanceof ReusablePage) {
        const name = element.props.name || '';
        r = { ...r, ...element.type.initialValues(name) };
      } else if (element.type.prototype instanceof Page) {
        r = { ...r, ...element.type.initialValues() };
      } else if ('qId' in element.props) {
        r[element.props.qId] = null;
      }
    });
    return r;
  }

  constructor(props) {
    super(props);
    this.setData = this.setData.bind(this);
    this.handleNext = this.handleNext.bind(this);
    this.handleBack = this.handleBack.bind(this);
    this.chooseRobot = this.chooseRobot.bind(this);

    if (!props.layout) {
      this.layout = [
        <Typography variant="h6">No layout provided, please specify questionaire layout in index.js</Typography>,
      ];
    } else {
      this.layout = props.layout;
    }

    this.layout_length = this.layout.length;

    const d = JSON.parse(localStorage.getItem('data')) || Navigator.getDefaultResults(props.layout);

    this.state = {
      current: 0,
      data: { chosen: '', ...d },
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

  setData(value) {
    const { data } = this.state;
    const newData = { ...data, ...value };
    this.setState({ data: newData });

    const { onResultChange } = this.props;
    onResultChange(newData);
    localStorage.setItem('data', JSON.stringify(newData));
  }

  chooseRobot(bot) {
    this.setData({ chosen: bot });
  }

  render() {
    const { current: c, data } = this.state;
    const { isLoading: loading } = this.props;
    return (
      <Box position="sticky" height="85%" display="flex" flexDirection="column">
        <Box>
          {
            React.cloneElement(this.layout[c], {
              data,
              setData: this.setData,
              isLoading: loading,
              chooseRobot: this.chooseRobot,
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
  onResultChange: PropTypes.func.isRequired,
  isLoading: PropTypes.func.isRequired,
};
