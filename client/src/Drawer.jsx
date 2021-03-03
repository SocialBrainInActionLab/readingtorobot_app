import React from 'react';
import PropTypes from 'prop-types';
import {
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
    const { robots } = this.props;
    return (
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
    );
  }
}

Drawer.propTypes = {
  setIPs: PropTypes.func.isRequired,
  robots: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default Drawer;
