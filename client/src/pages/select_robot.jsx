import React from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Grid,
  Typography,
} from '@material-ui/core';

function shuffle(array) {
  const res = array;
  let currentIndex = array.length;
  let temporaryValue;
  let randomIndex;

  // While there remain elements to shuffle...
  while (currentIndex !== 0) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    res[currentIndex] = array[randomIndex];
    res[randomIndex] = temporaryValue;
  }

  return array;
}

class RobotSelectionPage extends React.Component {
  constructor(props) {
    super(props);
    this.data = [];
    this.state = {
      robot: '',
    };
    this.robots = shuffle(['Cozmo', 'MiRo', 'NAO']);
    this.handleStart = this.handleStart.bind(this);
    this.handleStop = this.handleStop.bind(this);
  }

  handleStart(bot) {
    return () => {
      const { isLoading } = this.props;
      isLoading(true);
      fetch('/startRobot', {
        method: 'POST',
        body: JSON.stringify(bot),
        headers: new Headers({
          'content-type': 'application/json',
        }),
      })
        .then((res) => {
          if (res.status !== 200) {
            console.log(`Looks like there was a problem. Status code: ${res.status}`);
            isLoading(false);
            return;
          }
          res.json().then((data) => {
            console.log(data);
          });
        })
        .catch((error) => {
          console.log(`Fetch error: ${error}`);
        });
      const { setData } = this.props;
      this.setState({ robot: bot });
      setData(true);
      isLoading(false);
    };
  }

  handleStop(bot) {
    return () => {
      const { isLoading } = this.props;
      isLoading(true);
      fetch('/stopRobot', {
        method: 'POST',
        body: JSON.stringify(bot),
        headers: new Headers({
          'content-type': 'application/json',
        }),
      })
        .then((res) => {
          if (res.status !== 200) {
            console.log(`Looks like there was a problem. Status code: ${res.status}`);
            isLoading(false);
            return;
          }
          res.json().then((data) => {
            console.log(data);
          });
        })
        .catch((error) => {
          console.log(`Fetch error: ${error}`);
        });
      const { setData } = this.props;
      setData(true);
      isLoading(false);
    };
  }

  getRunning() {
    const { robot } = this.state;
    this.data.push();
    return <Grid element><Button onClick={this.handleStop(robot)}>Stop</Button></Grid>;
  }

  getIdle() {
    this.data.push();
    const buttons = [];

    for (let i = 0; i < this.robots.length; i += 1) {
      const bot = this.robots[i];
      const start = this.handleStart(bot);
      buttons.push(<Grid element><Button onClick={start}>{bot}</Button></Grid>);
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
  isLoading: PropTypes.func.isRequired,
};

RobotSelectionPage.defaultProps = {
  data: false,
};

export default RobotSelectionPage;
