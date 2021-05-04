/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import {
  Box,
  Grid,
} from '@material-ui/core';

import { Page, Question } from '../components';

export default class DemoPage4 extends Page {
  static initialValues() {
    return {
      q17: '',
      q18: '',
      q19: '',
      q20: '',
      q21: '',
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
            <Question
              question={`What makes ${d.chosen} a good reading buddy?`}
              data={d.q17}
              setData={this.handleChange('q17')}
            />
          </Grid>
          <Grid item>
            <Box height="20px" />
            <Question
              question={`How could ${d.chosen} be a better reading buddy?`}
              data={d.q18}
              setData={this.handleChange('q18')}
            />
          </Grid>
          <Grid item>
            <Box height="20px" />
            <Question
              question={`What types of activities could you do with ${d.chosen}? [Prompt for explanation].`}
              data={d.q19}
              setData={this.handleChange('q19')}
            />
          </Grid>
          <Grid item>
            <Box height="20px" />
            <Question
              question={`Can you think of something you probably shouldn’t do with the ${d.chosen}?
                         [Prompt for explanation].`}
              data={d.q20}
              setData={this.handleChange('q20')}
            />
          </Grid>
          <Grid item>
            <Box height="20px" />
            <Question
              question="Do you have any questions or is there anything else you’d like to say?"
              data={d.q21}
              setData={this.handleChange('q21')}
            />
          </Grid>
        </Grid>
      </Box>
    );
  }
}
