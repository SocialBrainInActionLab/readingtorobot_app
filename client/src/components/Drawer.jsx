import React from "react";
import PropTypes from "prop-types";
import {
  Button,
  Divider,
  Grid,
  List,
  ListItem,
  TextField,
} from "@material-ui/core";

class Drawer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleChangeIP = this.handleChangeIP.bind(this);
    this.handleChangeFile = this.handleChangeFile.bind(this);
  }

  handleChangeIP(id) {
    return (event) => {
      const { settings, setSettings } = this.props;
      settings.robotIPs[id] = event.target.value;
      setSettings(settings);
    };
  }

  handleChangeFile(event) {
    const { settings, setSettings } = this.props;
    settings.filename = event.target.value;
    setSettings(settings);
  }

  render() {
    const { settings, clearForm } = this.props;

    return (
      <Grid
        container
        direction="column"
        alignItems="center"
        justify="space-between"
        style={{ height: "90vh" }}
      >
        <Grid item>
          <List>
            <ListItem>Robot Ips</ListItem>
            {Object.keys(settings.robotIPs).map((robot) => {
              const change = this.handleChangeIP(robot);
              return (
                <ListItem>
                  <TextField
                    label={robot}
                    variant="outlined"
                    value={settings.robotIPs[robot]}
                    onChange={change}
                  />
                </ListItem>
              );
            })}
          </List>
        </Grid>
        <Grid item>
          <Divider />
        </Grid>
        <Grid item>
          <List>
            <ListItem>Data Storage</ListItem>
            <ListItem>
              <TextField
                label="Filename"
                variant="outlined"
                value={settings.filename}
                onChange={this.handleChangeFile}
              />
            </ListItem>
          </List>
        </Grid>
        <Grid item>
          <Button variant="outlined" onClick={clearForm}>
            Clear form
          </Button>
        </Grid>
      </Grid>
    );
  }
}

Drawer.propTypes = {
  setSettings: PropTypes.func.isRequired,
  settings: PropTypes.objectOf(PropTypes.string).isRequired,
  clearForm: PropTypes.func.isRequired,
};

export default Drawer;
