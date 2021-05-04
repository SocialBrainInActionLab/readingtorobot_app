/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import {
  Box,
  Divider,
  Grid,
} from '@material-ui/core';

import { IntensityButtons, Question, ReusablePage } from '../components';

export default class RobotVideoQuestionsPage extends ReusablePage {
  static initialValues(name) {
    const d = {};
    d[`${name}_q1`] = '';
    d[`${name}_q2`] = '';
    d[`${name}_q3`] = '';
    return d;
  }

  handleChange(qId) {
    return (event) => {
      const { setData } = this.props;
      const d = this.getState();
      d[qId] = event;
      setData(d);
    };
  }

  getState() {
    let { data: d } = this.props;
    const { name } = this.props;
    if (d && Object.keys(d).length === 0) {
      d = {};
      d[`${name}_q1`] = '';
      d[`${name}_q2`] = '';
      d[`${name}_q3`] = '';
    }
    return d;
  }

  render() {
    const { name } = this.props;
    const d = this.getState();

    return (
      <Box m={5}>
        <Grid container direction="column" spacing={2} align="center">
          <Grid item>
            <Question
              question="Do you have any questions about this robot?"
              data={d[`${name}_q1`]}
              setData={this.handleChange(`${name}_q1`)}
            />
          </Grid>
          <Grid item><Divider /></Grid>
          <Grid item>
            <Box height="20px" />
            <IntensityButtons
              question="How intelligent do you think this robot is?"
              data={d[`${name}_q2`]}
              setData={this.handleChange(`${name}_q2`)}
            />
          </Grid>
          <Grid item><Divider /></Grid>
          <Grid item>
            <Box height="20px" />
            <IntensityButtons
              question="How friendly do you think this robot is?"
              data={d[`${name}_q3`]}
              setData={this.handleChange(`${name}_q3`)}
            />
          </Grid>
        </Grid>
      </Box>
    );
  }
}
