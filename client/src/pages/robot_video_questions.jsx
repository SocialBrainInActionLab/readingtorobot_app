/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import {
  Box,
  Divider,
  Grid,
} from '@material-ui/core';

import { IntensityButtons, Question, ReusablePage } from '../components';

export default class RobotVideoQuestionsPage extends ReusablePage {
  render() {
    const { name } = this.props;

    return (
      <Box m={5}>
        <Grid container direction="column" spacing={2} align="center">
          <Grid item>
            <Question
              question="Do you have any questions about this robot?"
              qId={`${name}_q1`}
            />
          </Grid>
          <Grid item><Divider /></Grid>
          <Grid item>
            <Box height="20px" />
            <IntensityButtons
              question="How intelligent do you think this robot is?"
              qId={`${name}_q2`}
            />
          </Grid>
          <Grid item><Divider /></Grid>
          <Grid item>
            <Box height="20px" />
            <IntensityButtons
              question="How friendly do you think this robot is?"
              qId={`${name}_q3`}
            />
          </Grid>
        </Grid>
      </Box>
    );
  }
}
