import React from "react";

import {
  AppBar,
  Box,
  Button,
  Grid,
  IconButton,
  SwipeableDrawer,
  Toolbar,
  Typography,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";

import LoadingOverlay from "react-loading-overlay";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PropTypes from "prop-types";

import "./App.css";
import { Drawer, Navigator, QuestionaireContext } from "./components";

/**
 * Main application.
 *
 * @extends {React.Component}
 */
class App extends React.Component {
  /* Clear participant data. */
  static clearForm() {
    localStorage.removeItem("data");
    localStorage.removeItem("videos");
    window.location.reload();
  }

  /**
   * Update the server settings.
   * @param {any} msg Application settings: robot IPs and data file filename.
   */
  static sendSettings(msg) {
    fetch("/setSettings", {
      method: "POST",
      body: JSON.stringify(msg),
      headers: new Headers({
        "content-type": "application/json",
      }),
    })
      .then((res) => {
        if (res.status !== 200) {
          res.text().then((data) => {
            toast.error(
              `Looks like there was a problem storing your settings.
              Status code: ${res.status}
              Error: ${data}`,
              {
                toastId: "settingsRequestError",
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
          toastId: "settingsExceptionError",
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

  constructor(props) {
    super(props);

    this.handleSave = this.handleSave.bind(this);
    this.isLoading = this.isLoading.bind(this);
    this.setSettings = this.setSettings.bind(this);
    this.sendCurrentSettings = this.sendCurrentSettings.bind(this);

    this.state = {
      drawer: false,
      loading: false,
      settings: {},
    };
  }

  componentDidMount() {
    const ls = JSON.parse(localStorage.getItem("settings"));
    let { settings: s } = this.state;

    if (!ls) {
      s = {
        robotIPs: {
          miro: "10.3.141.60", // <- we'll reserve 60, 61, etc for different MiRos
          nao: "10.3.141.50", // <- 50, 51, etc for different NAOs
        },
        filename: "data.csv",
      };
    } else {
      s = ls;
    }

    App.sendSettings(s);

    this.setState({
      settings: s,
    });
  }

  /* Write the experiment responses to the output data file. */
  handleSave() {
    const { data: results } = this.context;
    if (!results) {
      return;
    }
    this.setState({ loading: true });
    const videoOrder = JSON.parse(localStorage.getItem("videos"));
    results.VideoOrder = videoOrder;
    fetch("/saveData", {
      method: "POST",
      body: JSON.stringify(results),
      headers: new Headers({
        "content-type": "application/json",
      }),
    })
      .then((res) => {
        if (res.status !== 200) {
          res.text().then((data) => {
            toast.error(
              `Looks like there was a problem saving the data.
              Status code: ${res.status}
              Error: ${data}`,
              {
                toastId: "saveRequestError",
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
        toast.success(
          <Grid
            container
            direction="row"
            alignItems="center"
            justify="space-between"
          >
            <Grid item>
              <Box width="200px">Data saved successfully!</Box>
            </Grid>
            <Grid item>
              <Button
                onClick={App.clearForm}
                variant="contained"
                style={{
                  backgroundColor: "#a7daa9",
                  fontSize: "12px",
                  padding: "1px 10px",
                }}
              >
                Clear form
              </Button>
            </Grid>
          </Grid>,
          {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          }
        );
      })
      .catch((error) => {
        toast.error(`Fetch error: ${error}`, {
          toastId: "saveRequestError",
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
    this.setState({ loading: false });
  }

  /**
   * Update the application settings in client side.
   * @param {any} value Application settings: robot IPs and data file filename.
   */
  setSettings(value) {
    localStorage.setItem("settings", JSON.stringify(value));
    this.setState({ settings: value });
  }

  /* Send stored settings to server. */
  sendCurrentSettings() {
    const { settings } = this.state;
    App.sendSettings(settings);
  }

  /**
   * Set the loading state value.
   * @param {any} value Loading state.
   */
  isLoading(value) {
    this.setState({ loading: value });
  }

  /**
   * Generate a method to toggle on/off the side menu drawer
   * @param {any} open Toggle state to be applied.
   * @returns {Function} Call this method to apply the state change.
   */
  toogleDrawer(open) {
    return (event) => {
      if (
        event.type === "keydown" &&
        (event.key === "Tab" || event.key === "Shift")
      ) {
        return;
      }
      this.setState({ drawer: open });
      if (!open) {
        this.sendCurrentSettings();
      }
    };
  }

  render() {
    const { drawer, loading, settings } = this.state;
    const { layout } = this.props;
    const TDON = this.toogleDrawer(true);
    const TDOFF = this.toogleDrawer(false);

    return (
      <div className="App">
        <LoadingOverlay active={loading} spinner>
          <Box height="100vh" width="100hh">
            <AppBar position="sticky">
              <Toolbar>
                <Grid
                  container
                  direction="row"
                  align="stretch"
                  justify="space-between"
                >
                  <IconButton
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    onClick={TDON}
                  >
                    <MenuIcon />
                  </IconButton>
                  <Typography variant="h6">Reading With Robots</Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={this.handleSave}
                  >
                    Save
                  </Button>
                </Grid>
              </Toolbar>
            </AppBar>
            <Navigator layout={layout} isLoading={this.isLoading} />
          </Box>

          <SwipeableDrawer
            anchor="left"
            open={drawer}
            onClose={TDOFF}
            onOpen={TDON}
          >
            <Drawer
              setSettings={this.setSettings}
              settings={settings}
              clearForm={App.clearForm}
            />
          </SwipeableDrawer>
          <ToastContainer
            position="top-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            style={{ width: "400px" }}
          />
        </LoadingOverlay>
      </div>
    );
  }
}

App.contextType = QuestionaireContext;

App.propTypes = {
  layout: PropTypes.arrayOf(PropTypes.element).isRequired,
};

export default App;
