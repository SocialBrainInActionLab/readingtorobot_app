/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import {
  Box,
  Grid,
} from '@material-ui/core';

import Page from './page';
import Question from '../Question';

export class DemoPage4 extends Page {
  static initialValues() {
    return {
      q14: null,
      q15: null,
      q16: null,
      q17: null,
      q18: null,
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

  getState() {
    let { data: d } = this.props;
    if (d && Object.keys(d).length === 0) {
      d = this.constructor.initialValues();
    }
    return d;
  }

  render() {
    const { robot } = this.props;
    const d = this.getState();
    const update1 = this.handleChange('q14');
    const update2 = this.handleChange('q15');
    const update3 = this.handleChange('q16');
    const update4 = this.handleChange('q17');
    const update5 = this.handleChange('q18');

    return (
      <Box m={5}>
        <Grid container direction="column" spacing={2}>
          <Grid item>
            <Box height="20px" />
            <Question
              question={`What makes ${robot} a good reading buddy?`}
              data={d.q14}
              setData={update1}
            />
          </Grid>
          <Grid item>
            <Box height="20px" />
            <Question
              question={`How could ${robot} be a better reading buddy?`}
              data={d.q15}
              setData={update2}
            />
          </Grid>
          <Grid item>
            <Box height="20px" />
            <Question
              question={`What types of activities could you do with ${robot}? [Prompt for explanation].`}
              data={d.q16}
              setData={update3}
            />
          </Grid>
          <Grid item>
            <Box height="20px" />
            <Question
              question={`Can you think of something you probably shouldn’t do with the ${robot}?
                         [Prompt for explanation].`}
              data={d.q17}
              setData={update4}
            />
          </Grid>
          <Grid item>
            <Box height="20px" />
            <Question
              question="Do you have any questions or is there anything else you’d like to say?"
              data={d.q18}
              setData={update5}
            />
          </Grid>
        </Grid>
      </Box>
    );
  }
}

export default DemoPage4;
