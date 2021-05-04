/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import {
  Box,
  Divider,
  Grid,
} from '@material-ui/core';

import { IntensityButtons, Page } from '../components';

export default class DemoPage2 extends Page {
  static initialValues() {
    return {
      q10: '',
      q11: '',
      q12: '',
    };
  }

  handleChange(id) {
    return (event) => {
      const { setData } = this.props;
      const d = this.getState();
      d[id] = event;
      setData(d);
    };
  }

  render() {
    const d = this.getState();

    if (!d.chosen) {
      d.chosen = 'The robot';
    }

    return (
      <Box m={5}>
        <Grid container direction="column" spacing={2}>
          <Grid item>
            <p>How much do you agree with each of these statements?</p>
          </Grid>
          <Grid item>
            <Box height="20px" />
            <IntensityButtons
              question={`${d.chosen} is a good listener.`}
              data={d.q10}
              setData={this.handleChange('q10')}
            />
          </Grid>
          <Grid item><Divider /></Grid>
          <Grid item>
            <Box height="20px" />
            <IntensityButtons
              question={`${d.chosen} is a good teacher.`}
              data={d.q11}
              setData={this.handleChange('q11')}
            />
          </Grid>
          <Grid item><Divider /></Grid>
          <Grid item>
            <Box height="20px" />
            <IntensityButtons
              question={`${d.chosen} is kind.`}
              data={d.q12}
              setData={this.handleChange('q12')}
            />
          </Grid>
          <Grid item><Divider /></Grid>

        </Grid>
      </Box>
    );
  }
}
