/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import {
  Box,
  Divider,
  Grid,
} from '@material-ui/core';

import Page from './page';
import IntensityButtons from '../IntensityButtons';

export class DemoPage2 extends Page {
  static initialValues() {
    return {
      listener: null,
      teacher: null,
      kind: null,
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

  getState() {
    let { data: d } = this.props;
    if (!d) {
      d = this.constructor.initialValues();
    }
    return d;
  }

  render() {
    const { robot } = this.props;
    const d = this.getState();
    const updateListener = this.handleChange('listener');
    const updateTeacher = this.handleChange('teacher');
    const updateKind = this.handleChange('kind');

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
              data={d.listener}
              setData={updateListener}
            />
          </Grid>
          <Grid item><Divider /></Grid>
          <Grid item>
            <Box height="20px" />
            <IntensityButtons
              question={`${robot} is a good teacher.`}
              data={d.teacher}
              setData={updateTeacher}
            />
          </Grid>
          <Grid item><Divider /></Grid>
          <Grid item>
            <Box height="20px" />
            <IntensityButtons
              question={`${robot} is kind.`}
              data={d.kind}
              setData={updateKind}
            />
          </Grid>
          <Grid item><Divider /></Grid>

        </Grid>
      </Box>
    );
  }
}

export default DemoPage2;
