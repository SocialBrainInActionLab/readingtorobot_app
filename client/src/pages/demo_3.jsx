/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import {
  Box,
  Divider,
  Grid,
} from '@material-ui/core';

import { Page, QuestionSelect } from '../components';

export default class DemoPage3 extends Page {
  static initialValues() {
    return {
      q13: '',
      q14: '',
      q15: '',
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

    if (!d.chosen) {
      d.chosen = 'the robot';
    }

    return (
      <Box m={5}>
        <Grid container direction="column" spacing={2}>
          <Grid item>
            <Box height="20px" />
            <QuestionSelect
              question="Is there anything you didn’t like about the robot?"
              options={['Yes', 'No']}
              data={d.q13}
              setData={this.handleChange('q13')}
            />
            <Divider />
          </Grid>
          <Grid item>
            <Box height="20px" />
            <QuestionSelect
              question={`If you had to read a really difficult book for the first time,
                        would you be more comfortable reading with a teacher or this robot?`}
              options={['Prefer Robots', 'Prefer Adult']}
              data={d.q14}
              setData={this.handleChange('q14')}
            />
            <Divider />
          </Grid>
          <Grid item>
            <Box height="20px" />
            <QuestionSelect
              question={`Did you like reading with ${d.chosen}? Why?`}
              options={['Yes', 'No']}
              data={d.q15}
              setData={this.handleChange('q15')}
            />
            <Divider />
          </Grid>
        </Grid>
      </Box>
    );
  }
}
