/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import {
  Box,
  Divider,
  Grid,
} from '@material-ui/core';

import { Page, Question, QuestionSelect } from '../components';

export default class DemoPage1 extends Page {
  render() {
    return (
      <Box m={5}>
        <Grid container direction="column" spacing={2}>
          <Grid item>
            <Box height="20px" />
            <Question
              question="How was that? What do you think about this robot?"
              qId="q7"
              {...this.props}
            />
          </Grid>
          <Grid item><Divider /></Grid>
          <Grid item>
            <QuestionSelect
              question={(
                <p>
                  <p>Do you think this is a helpful robot? Why (if not) / HOW (if so)?</p>
                  <p>
                    Prompts: What other things do you think it might be helpful with?
                    How helpful do you think this robot would be in helping kids learn to read?
                  </p>
                </p>
              )}
              options={['Yes', 'No']}
              qId="q8"
              {...this.props}
            />
          </Grid>
        </Grid>
      </Box>
    );
  }
}
