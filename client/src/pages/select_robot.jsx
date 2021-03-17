import React from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Divider,
  Grid,
  Typography,
  Switch,
} from '@material-ui/core';

function publishMQTT(topicName, message) {
  fetch('/pubMQTT', {
    method: 'POST',
    body: JSON.stringify({ topic: topicName, msg: message }),
    headers: new Headers({
      'content-type': 'application/json',
    }),
  })
    .then((res) => {
      if (res.status !== 200) {
        console.log(`Looks like there was a problem. Status code: ${res.status}`);
      }
    })
    .catch((error) => {
      console.log(`Fetch error: ${error}`);
    });
}

export class RobotSelectionPage extends React.Component {
  static sendEmotion(emotion) {
    return () => {
      publishMQTT('speech/cmd', emotion);
    };
  }

  constructor(props) {
    super(props);
    this.data = [];
    this.state = {
      robot: '',
      running: false,
      speechOn: true,
    };
    this.robots = ['Cozmo', 'MiRo', 'NAO'];
    this.handleStart = this.handleStart.bind(this);
    this.handleStop = this.handleStop.bind(this);
    this.getRobotState = this.getRobotState.bind(this);
    this.handleSpeechChange = this.handleSpeechChange.bind(this);
    this.sendEmotion = RobotSelectionPage.sendEmotion.bind(this);
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
      const { isLoading, chooseRobot } = this.props;
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
          this.setState({ robot: bot, speechOn: true });
          isLoading(false);
          chooseRobot(bot);
        })
        .catch((error) => {
          console.log(`Fetch error: ${error}`);
          isLoading(false);
        });
      chooseRobot(bot);
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

  handleSpeechChange(event) {
    const { isLoading } = this.props;
    isLoading(true);
    if (event.target.checked) {
      fetch('/startSpeech', {
        method: 'GET',
        headers: new Headers({
          'content-type': 'application/json',
        }),
        mode: 'cors',
      })
        .then((res) => {
          isLoading(false);
          if (res.status !== 200) {
            console.log(`Looks like there was a problem. Status code: ${res.status}`);
            return;
          }
          this.setState({ speechOn: true });
        })
        .catch((error) => {
          console.log(`Fetch error: ${error}`);
          isLoading(false);
        });
    } else {
      fetch('/stopSpeech', {
        method: 'GET',
        headers: new Headers({
          'content-type': 'application/json',
        }),
        mode: 'cors',
      })
        .then((res) => {
          isLoading(false);
          if (res.status !== 200) {
            console.log(`Looks like there was a problem. Status code: ${res.status}`);
            return;
          }
          this.setState({ speechOn: false });
        })
        .catch((error) => {
          console.log(`Fetch error: ${error}`);
          isLoading(false);
        });
    }
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
          this.setState({ running: data.running, speechOn: data.speech });
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
      buttons.push(<Grid element><Button variant="outlined" onClick={start}>{bot}</Button></Grid>);
    }
    return buttons;
  }

  paintRunning() {
    const { robot, speechOn } = this.state;
    this.data.push();
    return (
      <Grid
        container
        direction="column"
        justify="space-around"
        style={{ height: '60vh' }}
      >
        <Grid element>
          <Button variant="outlined" onClick={this.handleStop(robot)}>Stop</Button>
        </Grid>
        <Grid element>
          <Divider />
        </Grid>

        <Grid element>
          {`Speech Recognition: ${speechOn ? 'ON' : 'OFF'}`}
        </Grid>

        <Grid element>
          <Divider />
        </Grid>

        <Grid element>
          <Grid
            container
            direction="column"
            justify="space-evenly"
            style={{ height: '40vh' }}
          >
            <Grid element>
              <Switch
                checked={speechOn}
                onChange={this.handleSpeechChange}
                name="checkedB"
                color="primary"
              />
            </Grid>
            <Grid element>
              <Button variant="outlined" onClick={this.sendEmotion('happy')} disabled={speechOn}>Happy</Button>
            </Grid>
            <Grid element>
              <Button variant="outlined" onClick={this.sendEmotion('sad')} disabled={speechOn}>Sad</Button>
            </Grid>
            <Grid element>
              <Button variant="outlined" onClick={this.sendEmotion('excited')} disabled={speechOn}>Excited</Button>
            </Grid>
            <Grid element>
              <Button variant="outlined" onClick={this.sendEmotion('groan')} disabled={speechOn}>Groan</Button>
            </Grid>
            <Grid element>
              <Button variant="outlined" onClick={this.sendEmotion('scared')} disabled={speechOn}>Scared</Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
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
  chooseRobot: PropTypes.func.isRequired,
};

export default RobotSelectionPage;
