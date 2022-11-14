import React from "react";
import PropTypes from "prop-types";
import {
  Button,
  Divider,
  Grid,
  Typography,
  Switch,
  Box,
} from "@material-ui/core";

import { toast } from "react-toastify";
import { QuestionaireContext } from "../components";

function publishMQTT(topicName, message) {
  fetch("/pubMQTT", {
    method: "POST",
    body: JSON.stringify({ topic: topicName, msg: message }),
    headers: new Headers({
      "content-type": "application/json",
    }),
  })
    .then((res) => {
      if (res.status !== 200) {
        res.text().then((data) => {
          toast.error(
            `Looks like there was a problem when publishing a MQTT message.
            Status code: ${res.status}
            Error: ${data}`,
            {
              toastId: "mqttRequestError",
              position: "top-center",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            }
          );
        });
      }
    })
    .catch((error) => {
      toast.error(`Fetch error: ${error}`, {
        toastId: "mqttExceptionError",
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    });
}

function actionAvailable(robot, action) {
  switch (robot.toLowerCase()) {
    case "cozmo":
      if (action === "scared") {
        return true;
      }
      break;
    case "miro":
      if (action === "scared") {
        return true;
      }
      break;
    case "nao":
      if (action === "happy") {
        return true;
      }
      break;
    default:
      break;
  }
  return false;
}

export default class RobotSelectionPage extends React.Component {
  static sendEmotion(emotion) {
    return () => {
      publishMQTT("speech/cmd", emotion);
    };
  }

  constructor(props) {
    super(props);
    this.data = [];
    this.state = {
      robot: "",
      running: false,
      speechOn: false,
    };
    this.robots = ["Cozmo", "MiRo", "NAO"];
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
      const { isLoading } = this.props;
      isLoading(true);
      fetch("/startRobot", {
        method: "POST",
        body: JSON.stringify(bot),
        headers: new Headers({
          "content-type": "application/json",
        }),
      })
        .then((res) => {
          if (res.status !== 200) {
            res.text().then((data) => {
              toast.error(
                `Looks like there was a problem starting the robot.
                Status code: ${res.status}
                Error: ${data}`,
                {
                  toastId: "robotStartRequestError",
                  position: "top-center",
                  autoClose: 5000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                }
              );
            });
            isLoading(false);
            return;
          }
          this.setState({ robot: bot, speechOn: true });
          isLoading(false);
          this.chooseRobot(bot);
        })
        .catch((error) => {
          toast.error(`Fetch error: ${error}`, {
            toastId: "robotStartExceptionError",
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          isLoading(false);
        });
      this.chooseRobot(bot);
    };
  }

  handleStop(bot) {
    return () => {
      const { isLoading } = this.props;
      isLoading(true);
      fetch("/stopRobot", {
        method: "POST",
        body: JSON.stringify(bot),
        headers: new Headers({
          "content-type": "application/json",
        }),
      })
        .then((res) => {
          if (res.status !== 200) {
            res.text().then((data) => {
              toast.error(
                `Looks like there was a problem stopping the robot.
                Status code: ${res.status}
                Error: ${data}`,
                {
                  toastId: "robotStopRequestError",
                  position: "top-center",
                  autoClose: 5000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                }
              );
            });
            isLoading(false);
            return;
          }
          res.json().then((data) => {
            // eslint-disable-next-line
            console.log(data);
          });
          this.setState({ robot: "" });
          isLoading(false);
        })
        .catch((error) => {
          toast.error(`Fetch error: ${error}`, {
            toastId: "robotStopExceptionError",
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          isLoading(false);
        });
    };
  }

  handleSpeechChange(event) {
    const { isLoading } = this.props;
    isLoading(true);
    if (event.target.checked) {
      fetch("/startSpeech", {
        method: "GET",
        headers: new Headers({
          "content-type": "application/json",
        }),
        mode: "cors",
      })
        .then((res) => {
          isLoading(false);
          if (res.status !== 200) {
            res.text().then((data) => {
              toast.error(
                `Looks like there was a problem starting the speech recognition module.
                Status code: ${res.status}
                Error: ${data}`,
                {
                  toastId: "speechStartRequestError",
                  position: "top-center",
                  autoClose: 5000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                }
              );
            });
            return;
          }
          this.setState({ speechOn: true });
        })
        .catch((error) => {
          toast.error(`Fetch error: ${error}`, {
            toastId: "speechStartExceptionError",
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          isLoading(false);
        });
    } else {
      fetch("/stopSpeech", {
        method: "GET",
        headers: new Headers({
          "content-type": "application/json",
        }),
        mode: "cors",
      })
        .then((res) => {
          isLoading(false);
          if (res.status !== 200) {
            res.text().then((data) => {
              toast.error(
                `Looks like there was a problem stopping the speech recognition module.
                Status code: ${res.status}
                Error: ${data}`,
                {
                  toastId: "speechStopRequestError",
                  position: "top-center",
                  autoClose: 5000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                }
              );
            });
            return;
          }
          this.setState({ speechOn: false });
        })
        .catch((error) => {
          toast.error(`Fetch error: ${error}`, {
            toastId: "speechStopExceptionError",
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          isLoading(false);
        });
    }
  }

  getRobotState() {
    fetch("/getRobotState", {
      method: "GET",
      headers: new Headers({
        "content-type": "application/json",
      }),
      mode: "cors",
    })
      .then((res) => {
        if (res.status !== 200) {
          res.text().then((data) => {
            toast.error(
              `Looks like there was a problem fetching the robot state.
              Status code: ${res.status}
              Error: ${data}`,
              {
                toastId: "robotStateRequestError",
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              }
            );
          });
          return;
        }
        res.json().then((data) => {
          this.setState({ running: data.running, speechOn: data.speech });
        });
      })
      .catch((error) => {
        toast.error(`Fetch error: ${error}`, {
          toastId: "robotStateExceptionError",
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
  }

  chooseRobot(bot) {
    const { update } = this.context;
    update({ chosen: bot });
  }

  paintIdle() {
    this.data.push();
    const buttons = [];

    for (let i = 0; i < this.robots.length; i += 1) {
      const bot = this.robots[i];
      const start = this.handleStart(bot);
      buttons.push(
        <Grid element>
          <Button variant="outlined" onClick={start}>
            {bot}
          </Button>
        </Grid>
      );
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
        style={{ height: "65vh" }}
      >
        <Grid element>
          <Button variant="outlined" onClick={this.handleStop(robot)}>
            Stop
          </Button>
        </Grid>
        <Grid element>
          <Divider />
        </Grid>

        <Grid element>
          <Grid container direction="column" justify="space-between">
            <Grid element>
              {`Speech Recognition: ${speechOn ? "ON" : "OFF"}`}
            </Grid>

            <Grid element>
              <Switch
                checked={speechOn}
                onChange={this.handleSpeechChange}
                name="checkedB"
                color="primary"
              />
            </Grid>
          </Grid>
        </Grid>

        <Grid element>
          <Divider />
        </Grid>

        <Grid element>
          <Grid container direction="row" justify="space-around">
            <Grid element>
              <Button
                variant="outlined"
                onClick={this.sendEmotion("happy")}
                disabled={speechOn || actionAvailable(robot, "happy")}
              >
                Happy
              </Button>
            </Grid>
            <Grid element>
              <Button
                variant="outlined"
                onClick={this.sendEmotion("sad")}
                disabled={speechOn || actionAvailable(robot, "sad")}
              >
                Sad
              </Button>
            </Grid>
            <Grid element>
              <Button
                variant="outlined"
                onClick={this.sendEmotion("excited")}
                disabled={speechOn || actionAvailable(robot, "excited")}
              >
                Excited
              </Button>
            </Grid>
            <Grid element>
              <Button
                variant="outlined"
                onClick={this.sendEmotion("groan")}
                disabled={speechOn || actionAvailable(robot, "groan")}
              >
                Annoyed
              </Button>
            </Grid>
            <Grid element>
              <Button
                variant="outlined"
                onClick={this.sendEmotion("scared")}
                disabled={speechOn || actionAvailable(robot, "scared")}
              >
                {robot.toLowerCase() === "nao" ? "Surprised" : "Scared"}
              </Button>
            </Grid>
          </Grid>
        </Grid>

        <Grid element>
          <Divider />
        </Grid>

        <Grid element>
          <Grid
            container
            direction="row"
            justify="center"
            // style={{ height: '40vh' }}
          >
            <Grid element>
              <Button
                variant="outlined"
                onClick={this.sendEmotion("start")}
                disabled={actionAvailable(robot, "start")}
              >
                Start
              </Button>
            </Grid>
            <Grid element>
              <Box width="15vw" />
            </Grid>
            <Grid element>
              <Button
                variant="outlined"
                onClick={this.sendEmotion("end")}
                disabled={actionAvailable(robot, "end")}
              >
                End
              </Button>
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
        style={{ height: "70vh" }}
      >
        <Typography variant="h6">Robot Control</Typography>
        {running ? this.paintRunning() : this.paintIdle()}
      </Grid>
    );
  }
}

RobotSelectionPage.contextType = QuestionaireContext;

RobotSelectionPage.propTypes = {
  isLoading: PropTypes.func.isRequired,
};
