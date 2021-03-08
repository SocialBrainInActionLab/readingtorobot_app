import React from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Grid,
  List,
  ListItem,
  TextField,
} from '@material-ui/core';

class Drawer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(id) {
    return (event) => {
      const { robots, setIPs } = this.props;
      robots[id] = event.target.value;
      setIPs(robots);
    };
  }

  render() {
    const { robots, clearForm } = this.props;
    return (
      <Grid
        container
        direction="column"
        alignItems="center"
        justify="space-between"
        style={{ height: '90vh' }}
      >
        <Grid item>
          <List>
            <ListItem>Robot Ips</ListItem>
            {Object.keys(robots).map((robot) => {
              const change = this.handleChange(robot);
              return (
                <ListItem>
                  <TextField
                    label={robot}
                    variant="outlined"
                    value={robots[robot]}
                    onChange={change}
                  />
                </ListItem>
              );
            })}
          </List>
        </Grid>
        <Grid item>
          <Button onClick={clearForm}>Clear form</Button>
        </Grid>
      </Grid>
    );
  }
}

Drawer.propTypes = {
  setIPs: PropTypes.func.isRequired,
  robots: PropTypes.objectOf(PropTypes.string).isRequired,
  clearForm: PropTypes.func.isRequired,
};

export default Drawer;
