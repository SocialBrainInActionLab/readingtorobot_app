import React from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Grid,
  Typography,
} from '@material-ui/core';

class RobotSelectionPage extends React.Component {
  constructor(props) {
    super(props);
    this.data = [];
    this.robots = ['Cozmo', 'MiRo', 'NAO'];
    this.handleStart = this.handleStart.bind(this);
    this.handleStop = this.handleStop.bind(this);
  }

  handleStart() {
    const { setData } = this.props;
    setData(true);
  }

  handleStop() {
    const { setData } = this.props;
    setData(false);
  }

  getRunning() {
    this.data.push();
    return <Grid element><Button onClick={this.handleStop}>Stop</Button></Grid>;
  }

  getIdle() {
    this.data.push();
    const buttons = [];

    for (let i = 0; i < this.robots.length; i += 1) {
      buttons.push(<Grid element><Button onClick={this.handleStart}>{this.robots[i]}</Button></Grid>);
    }
    return buttons;
  }

  getButtons(running) {
    return running ? this.getRunning() : this.getIdle();
  }

  render() {
    const { data: running } = this.props;

    return (
      <Grid
        container
        direction="column"
        justify="space-evenly"
        style={{ height: '70vh' }}
      >
        <Typography variant="h6">Under construction</Typography>
        {this.getButtons(running)}
      </Grid>
    );
  }
}

RobotSelectionPage.propTypes = {
  data: PropTypes.bool,
  setData: PropTypes.func.isRequired,
};

RobotSelectionPage.defaultProps = {
  data: false,
};

export default RobotSelectionPage;
