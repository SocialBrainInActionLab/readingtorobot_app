/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import {
  Box,
  Grid,
} from '@material-ui/core';
import ReactPlayer from 'react-player';

import { Page } from '../components';

export default class RobotVideoPage extends Page {
  handleChange(event) {
    const { setData, robotName } = this.props;
    const d = this.getState();
    d[`${robotName}Questions`] = event;
    setData(d);
  }

  getState() {
    let { data: d } = this.props;
    const { robotName } = this.props;
    if (d && Object.keys(d).length === 0) {
      d = {};
      d[`${robotName}Questions`] = '';
    }
    return d;
  }

  render() {
    const { url } = this.props;

    return (
      <Box m={5}>
        <Grid container direction="column" spacing={2} align="center">
          <Grid item>
            <Box height="20px" />
            <ReactPlayer url={url} controls />
          </Grid>
        </Grid>
      </Box>
    );
  }
}
