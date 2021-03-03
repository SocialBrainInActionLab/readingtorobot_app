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
      running: false,
    };
    this.robots = shuffle(['Cozmo', 'MiRo', 'NAO']);
    this.handleStart = this.handleStart.bind(this);
    this.handleStop = this.handleStop.bind(this);
    this.getRobotState = this.getRobotState.bind(this);
  }

  componentDidMount() {
    this.getRobotState();
    this.intervalId = setInterval(this.getRobotState, 1000);
  }

  componentWillUnmount() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
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
          this.setState({ robot: bot });
          isLoading(false);
        })
        .catch((error) => {
          console.log(`Fetch error: ${error}`);
          isLoading(false);
        });
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
          this.setState({ robot: '' });
          isLoading(false);
        })
        .catch((error) => {
          console.log(`Fetch error: ${error}`);
          isLoading(false);
        });
    };
  }

  getRobotState() {
    fetch('/getRobotState', {
      method: 'GET',
      headers: new Headers({
        'content-type': 'application/json',
      }),
      mode: 'cors',
    })
      .then((res) => {
        if (res.status !== 200) {
          console.log(`Looks like there was a problem. Status code: ${res.status}`);
          return;
        }
        res.json().then((data) => {
          if (data.running > 0) {
            this.setState({ running: true });
          } else {
            this.setState({ running: false });
          }
        });
      })
      .catch((error) => {
        console.log(`Fetch error: ${error}`);
      });
  }

  paintIdle() {
    this.data.push();
    const buttons = [];

    for (let i = 0; i < this.robots.length; i += 1) {
      const bot = this.robots[i];
      const start = this.handleStart(bot);
      buttons.push(<Grid element><Button onClick={start}>{bot}</Button></Grid>);
    }
    return buttons;
  }

  paintRunning() {
    const { robot } = this.state;
    this.data.push();
    return <Grid element><Button onClick={this.handleStop(robot)}>Stop</Button></Grid>;
  }

  render() {
    const { running } = this.state;

    return (
      <Grid
        container
        direction="column"
        justify="space-evenly"
        style={{ height: '70vh' }}
      >
        <Typography variant="h6">Under construction</Typography>
        {running ? this.paintRunning() : this.paintIdle()}
      </Grid>
    );
  }
}

RobotSelectionPage.propTypes = {
  isLoading: PropTypes.func.isRequired,
};

export default RobotSelectionPage;
