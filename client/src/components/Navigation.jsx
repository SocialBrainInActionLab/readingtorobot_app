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

class Navigator extends React.Component {
  constructor(props) {
    super(props);
    this.setData = this.setData.bind(this);
    this.getData = this.getData.bind(this);
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
    let ls = JSON.parse(localStorage.getItem('data'));

    if (!ls || (ls.length !== this.layout.length)) {
      ls = [];
      for (let i = 0; i < this.layout.length; i += 1) {
        ls.push({});
      }
    }

    this.state = {
      current: 0,
      data: ls,
      chosenRobot: null,
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
    const { current: c, data } = this.state;
    const { onResultChange } = this.props;
    const NewData = data;
    NewData[c] = value;
    this.setState({ data: NewData });
    onResultChange(data);
    localStorage.setItem('data', JSON.stringify(data));
  }

  getData() {
    const { current: c } = this.state;
    return this.data[c];
  }

  chooseRobot(bot) {
    this.setData({ chosen: bot });
    this.setState({ chosenRobot: bot });
  }

  render() {
    const { current: c, data, chosenRobot } = this.state;
    const { isLoading: loading } = this.props;
    return (
      <Box position="sticky" height="85%" display="flex" flexDirection="column">
        <Box>
          {
            React.cloneElement(this.layout[c], {
              data: data[c],
              setData: this.setData,
              isLoading: loading,
              robot: chosenRobot,
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

export default Navigator;
