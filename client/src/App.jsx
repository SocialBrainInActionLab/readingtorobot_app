import {
  AppBar,
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Grid,
  IconButton,
  SwipeableDrawer,
  Toolbar,
  Typography,
} from '@material-ui/core';

import MenuIcon from '@material-ui/icons/Menu';
import React from 'react';
import PropTypes from 'prop-types';
import './App.css';
import Navigator from './Navigation';
import Drawer from './Drawer';

class App extends React.Component {
  constructor(props) {
    super(props);
    // TODO: Populate results from formularies
    this.results = {};
    this.state = {
      drawer: false,
      loading: false,
      robots: {
        miro: '0.0.0.0',
        nao: '0.0.0.0',
      },
    };
    this.handleResultChange = this.handleResultChange.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.isLoading = this.isLoading.bind(this);
    this.setRobotIPs = this.setRobotIPs.bind(this);
    this.sendRobotIPs = this.sendRobotIPs.bind(this);
  }

  handleResultChange(result) {
    this.results = result;
  }

  handleSave() {
    this.setState({ loading: true });
    fetch('/saveData', {
      method: 'POST',
      body: JSON.stringify(this.results),
      headers: new Headers({
        'content-type': 'application/json',
      }),
    })
      .then((res) => {
        if (res.status !== 200) {
          console.log(`Looks like there was a problem. Status code: ${res.status}`);
          return;
        }
        res.json().then((data) => {
          console.log(data);
        });
      })
      .catch((error) => {
        console.log(`Fetch error: ${error}`);
      });
    this.setState({ loading: false });
  }

  setRobotIPs(value) {
    this.setState({ robots: value });
  }

  sendRobotIPs() {
    const { robots } = this.state;
    fetch('/setRobotIP', {
      method: 'POST',
      body: JSON.stringify(robots),
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

  isLoading(value) {
    this.setState({ loading: value });
  }

  toogleDrawer(open) {
    return (event) => {
      if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
        return;
      }
      this.setState({ drawer: open });
      if (!open) {
        this.sendRobotIPs();
      }
    };
  }

  render() {
    const { drawer, loading, robots } = this.state;
    const { layout } = this.props;
    const TDON = this.toogleDrawer(true);
    const TDOFF = this.toogleDrawer(false);

    return (
      <div className="App">
        <Box height="100vh" width="100hh">
          <AppBar position="static">
            <Toolbar>
              <Grid
                container
                direction="row"
                align="stretch"
                justify="space-between"
              >
                <IconButton edge="start" color="inherit" aria-label="menu" onClick={TDON}>
                  <MenuIcon />
                </IconButton>
                <Typography variant="h6">
                  Reading With Robots
                </Typography>
                <Button color="inherit" onClick={this.handleSave}>Save</Button>
              </Grid>
            </Toolbar>
          </AppBar>
          <Navigator layout={layout} onResultChange={this.handleResultChange} isLoading={this.isLoading} />
        </Box>

        <SwipeableDrawer
          anchor="left"
          open={drawer}
          onClose={TDOFF}
          onOpen={TDON}
        >
          <Drawer setIPs={this.setRobotIPs} robots={robots} />
        </SwipeableDrawer>
        <Backdrop open={loading}>
          <CircularProgress color="inherit" />
        </Backdrop>
      </div>
    );
  }
}

App.propTypes = {
  layout: PropTypes.arrayOf(PropTypes.element).isRequired,
};

export default App;
