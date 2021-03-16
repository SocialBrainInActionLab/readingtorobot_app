import {
  AppBar,
  Box,
  Button,
  Grid,
  IconButton,
  SwipeableDrawer,
  Toolbar,
  Typography,
} from '@material-ui/core';
import LoadingOverlay from 'react-loading-overlay';

import MenuIcon from '@material-ui/icons/Menu';
import React from 'react';
import PropTypes from 'prop-types';
import './App.css';
import Navigator from './Navigation';
import Drawer from './Drawer';

class App extends React.Component {
  static clearForm() {
    localStorage.removeItem('data');
    window.location.reload();
  }

  static sendSettings(msg) {
    fetch('/setSettings', {
      method: 'POST',
      body: JSON.stringify(msg),
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

  constructor(props) {
    super(props);
    // TODO: Populate results from formularies
    this.state = {
      drawer: false,
      loading: false,
      settings: {},
      results: localStorage.getItem('data'),
    };
    this.handleResultChange = this.handleResultChange.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.isLoading = this.isLoading.bind(this);
    this.setSettings = this.setSettings.bind(this);
    this.sendCurrentSettings = this.sendCurrentSettings.bind(this);
  }

  componentDidMount() {
    const ls = JSON.parse(localStorage.getItem('settings'));
    let { settings: s } = this.state;

    if (!ls) {
      s = {
        robotIPs: {
          miro: '0.0.0.0',
          nao: '0.0.0.0',
        },
        filename: 'data.csv',
      };
    } else {
      s = ls;
    }
    this.setState({ settings: s });
    App.sendSettings(s);
  }

  handleResultChange(result) {
    this.setState({ results: result });
  }

  handleSave() {
    const { results } = this.state;
    this.setState({ loading: true });
    fetch('/saveData', {
      method: 'POST',
      body: JSON.stringify(results),
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

  setSettings(value) {
    localStorage.setItem('settings', JSON.stringify(value));
    this.setState({ settings: value });
  }

  sendCurrentSettings() {
    const { settings } = this.state;
    App.sendSettings(settings);
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
          <Box height="100vh" width="100hh" position="sticky">
            <AppBar position="sticky">
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
                  <Button variant="contained" color="primary" onClick={this.handleSave}>Save</Button>
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
            <Drawer setSettings={this.setSettings} settings={settings} clearForm={App.clearForm} />
          </SwipeableDrawer>
        </LoadingOverlay>
      </div>
    );
  }
}

App.propTypes = {
  layout: PropTypes.arrayOf(PropTypes.element).isRequired,
};

export default App;
