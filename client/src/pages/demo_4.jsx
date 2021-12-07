/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import {
  Box,
  Grid,
} from '@material-ui/core';

import { Page, Question } from '../components';

export default class DemoPage4 extends Page {
  getState() {
    const { data } = this.context;
    return data.chosen || 'the robot';
  }

  render() {
    const robot = this.getState();

    return (
      <Box m={5}>
        <Grid container direction="column" spacing={2}>
          <Grid item>
            <Box height="20px" />
            <Question
              question={`What makes ${robot} a good reading buddy?`}
              qId="GoodReadBudQuals_O"
            />
          </Grid>
          <Grid item>
            <Box height="20px" />
            <Question
              question={`How could ${robot} be a better reading buddy?`}
              qId="BetterReadButQuals_Q"
            />
          </Grid>
          <Grid item>
            <Box height="20px" />
            <Question
              question={`What types of activities could you do with ${robot}? [Prompt for explanation].`}
              qId="Activities_O"
            />
          </Grid>
          <Grid item>
            <Box height="20px" />
            <Question
              question={`Can you think of something you probably shouldn’t do with the ${robot}?
                         [Prompt for explanation].`}
              qId="AvoidActivities_O"
            />
          </Grid>
          <Grid item>
            <Box height="20px" />
            <Question
              question={`Do you think ${robot} could read this book on their own? [Prompt for explanation]`}
              qId="RobotCanRead_O"
            />
          </Grid>
          <Grid item>
            <Box height="20px" />
            <Question
              question="Do you have any questions or is there anything else you’d like to say?"
              qId="FinalComments_O"
            />
          </Grid>
        </Grid>
      </Box>
    );
  }
}
