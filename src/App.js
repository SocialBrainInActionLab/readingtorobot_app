import { AppBar, Box, Button, Grid, IconButton, Toolbar, Typography } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import React from 'react';
import './App.css';
import {Navigator} from './Navigation.js'


class Base extends React.Component {
  constructor(props) {
    super(props);
    // TODO: Populate results from formularies
    this.results = {};
  }

  render () {
    return (
      <div className="App">
        <Box height="100vh" width="100hh">
          <AppBar position="static">
            <Toolbar >
            <Grid
            container
            direction="row"
            align="stretch"
            justify="space-between">
              <IconButton edge="start" className={"classes.menuButton"} color="inherit" aria-label="menu">
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" className={"classes.title"}>
                Reading With Robots
              </Typography>
              <Button color="inherit">Save</Button>
              </Grid>
            </Toolbar>
          </AppBar>
          <Navigator/>
        </Box>
      </div>
    )
  }
}


function App() {

  return (
      <Base></Base>
  );
}

export default App;
