/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import {
  Box,
  Divider,
  Grid,
} from '@material-ui/core';

import { Page, QuestionSelect } from '../components';

export default class DemoPage3 extends Page {
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
            <Box height="20px" />
            <QuestionSelect
              question="Is there anything you didn’t like about the robot?"
              options={['Yes', 'No']}
              qId="q13"
              {...this.props}
            />
            <Divider />
          </Grid>
          <Grid item>
            <Box height="20px" />
            <QuestionSelect
              question={`If you had to read a really difficult book for the first time,
                        would you be more comfortable reading with a teacher or this robot?`}
              options={['Prefer Robots', 'Prefer Adult']}
              qId="q14"
              {...this.props}
            />
            <Divider />
          </Grid>
          <Grid item>
            <Box height="20px" />
            <QuestionSelect
              question={`Did you like reading with ${robot}? Why?`}
              options={['Yes', 'No']}
              qId="q15"
              {...this.props}
            />
            <Divider />
          </Grid>
        </Grid>
      </Box>
    );
  }
}
