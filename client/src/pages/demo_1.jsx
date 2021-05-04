/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import {
  Box,
  Divider,
  Grid,
} from '@material-ui/core';

import { Page, Question, QuestionSelect } from '../components';

export default class DemoPage1 extends Page {
  static initialValues() {
    return {
      q7: '',
      q8: '',
    };
  }

  handleChange(id) {
    return (event) => {
      const { setData } = this.props;
      const d = this.getState();

      if (typeof event === 'string' || event instanceof String || event instanceof Object) {
        d[id] = event;
      } else {
        d[id] = event.target.value;
      }
      setData(d);
    };
  }

  render() {
    const d = this.getState();

    return (
      <Box m={5}>
        <Grid container direction="column" spacing={2}>
          <Grid item>
            <Box height="20px" />
            <Question
              question="How was that? What do you think about this robot?"
              data={d.q7}
              setData={this.handleChange('q7')}
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
              data={d.q8}
              setData={this.handleChange('q8')}
            />
          </Grid>
        </Grid>
      </Box>
    );
  }
}
