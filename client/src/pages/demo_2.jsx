/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import {
  Box,
  Divider,
  Grid,
} from '@material-ui/core';

import Page from './page';
import IntensityButtons from '../components/IntensityButtons';

export default class DemoPage2 extends Page {
  static initialValues() {
    return {
      q10: null,
      q11: null,
      q12: null,
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
    const { robot } = this.props;
    const d = this.getState();
    const updateListener = this.handleChange('q10');
    const updateTeacher = this.handleChange('q11');
    const updateKind = this.handleChange('q12');

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
              data={d.q10}
              setData={updateListener}
            />
          </Grid>
          <Grid item><Divider /></Grid>
          <Grid item>
            <Box height="20px" />
            <IntensityButtons
              question={`${robot} is a good teacher.`}
              data={d.q11}
              setData={updateTeacher}
            />
          </Grid>
          <Grid item><Divider /></Grid>
          <Grid item>
            <Box height="20px" />
            <IntensityButtons
              question={`${robot} is kind.`}
              data={d.q12}
              setData={updateKind}
            />
          </Grid>
          <Grid item><Divider /></Grid>

        </Grid>
      </Box>
    );
  }
}
