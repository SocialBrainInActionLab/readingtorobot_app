/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import {
  Box,
  Divider,
  Grid,
} from '@material-ui/core';

import { IntensityButtons, Page } from '../components';

export default class DemoPage2 extends Page {
  getState() {
    const { data } = this.props;
    return data.chosen || 'the robot';
  }

  render() {
    const robot = this.getState();

    return (
      <Box m={5}>
        <Grid container direction="column" spacing={2}>
          <Grid item>
            <p>How much do you agree with each of these statements?</p>
          </Grid>
          <Grid item>
            <Box height="20px" />
            <IntensityButtons
              question={`${robot} is a good listener.`}
              qId="q10"
              {...this.props}
            />
          </Grid>
          <Grid item><Divider /></Grid>
          <Grid item>
            <Box height="20px" />
            <IntensityButtons
              question={`${robot} is a good teacher.`}
              qId="q11"
              {...this.props}
            />
          </Grid>
          <Grid item><Divider /></Grid>
          <Grid item>
            <Box height="20px" />
            <IntensityButtons
              question={`${robot} is kind.`}
              qId="q12"
              {...this.props}
            />
          </Grid>
          <Grid item><Divider /></Grid>

        </Grid>
      </Box>
    );
  }
}
