import {
  AppBar,
  Box,
  Button,
  Divider,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  SwipeableDrawer,
  Toolbar,
  Typography,
} from '@material-ui/core';

import MenuIcon from '@material-ui/icons/Menu';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import React from 'react';
import './App.css';
import Navigator from './Navigation';

class Base extends React.Component {
  constructor(props) {
    super(props);
    // TODO: Populate results from formularies
    this.results = {};
    this.state = {
      drawer: false,
    };
  }

  toogleDrawer(open) {
    return (event) => {
      if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
        return;
      }
      this.setState({ drawer: open });
    };
  }

  render() {
    const { drawer } = this.state;
    const TDON = this.toogleDrawer(true);
    const TDOFF = this.toogleDrawer(false);
    const list = (
      <div
        role="presentation"
        onClick={TDOFF}
        onKeyDown={TDOFF}
      >
        <List>
          {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {['All mail', 'Trash', 'Spam'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </div>
    );
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
                <Button color="inherit">Save</Button>
              </Grid>
            </Toolbar>
          </AppBar>
          <Navigator />
        </Box>
        <SwipeableDrawer
          anchor="left"
          open={drawer}
          onClose={TDOFF}
          onOpen={TDON}
        >
          {list}
        </SwipeableDrawer>
      </div>
    );
  }
}

function App() {
  return (
    <Base />
  );
}

export default App;
