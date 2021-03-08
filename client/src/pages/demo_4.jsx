/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import {
  Box,
  Divider,
  Grid,
} from '@material-ui/core';

import Page from './page';
import Question from '../Question';

export class DemoPage4 extends Page {
  static initialValues() {
    return {
      good_reading_buddy: null,
      improvements: null,
      activities: null,
      not_tos: null,
      questions: null,
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
    if (!d) {
      d = this.constructor.initialValues();
    }
    return d;
  }

  render() {
    const { robot } = this.props;
    const d = this.getState();
    const update1 = this.handleChange('good_reading_buddy');
    const update2 = this.handleChange('improvements');
    const update3 = this.handleChange('activities');
    const update4 = this.handleChange('not_tos');
    const update5 = this.handleChange('questions');

    return (
      <Box m={5}>
        <Grid container direction="column" spacing={2}>
          <Grid item>
            <Box height="20px" />
            <Question
              question={`What makes ${robot} a good reading buddy?`}
              data={d.good_reading_buddy}
              setData={update1}
            />
            <Divider />
          </Grid>
          <Grid item>
            <Box height="20px" />
            <Question
              question={`How could ${robot} be a better reading buddy?`}
              data={d.improvements}
              setData={update2}
            />
            <Divider />
          </Grid>
          <Grid item>
            <Box height="20px" />
            <Question
              question={`What types of activities could you do with ${robot}? [Prompt for explanation].`}
              data={d.activities}
              setData={update3}
            />
            <Divider />
          </Grid>
          <Grid item>
            <Box height="20px" />
            <Question
              question={`Can you think of something you probably shouldn’t do with the ${robot}?
                         [Prompt for explanation].`}
              data={d.not_tos}
              setData={update4}
            />
            <Divider />
          </Grid>
          <Grid item>
            <Box height="20px" />
            <Question
              question="Do you have any questions or is there anything else you’d like to say?"
              data={d.questions}
              setData={update5}
            />
            <Divider />
          </Grid>
        </Grid>
      </Box>
    );
  }
}

export default DemoPage4;
