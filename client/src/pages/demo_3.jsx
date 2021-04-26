/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import {
  Box,
  Divider,
  Grid,
} from '@material-ui/core';

import Page from './page';
import QuestionSelect from '../Question_select';

export default class DemoPage3 extends Page {
  static initialValues() {
    return {
      q13: null,
      q14: null,
      q15: null,
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
    const updateDislikes = this.handleChange('q13');
    const updateLikes = this.handleChange('q14');

    return (
      <Box m={5}>
        <Grid container direction="column" spacing={2}>
          <Grid item>
            <Box height="20px" />
            <QuestionSelect
              question="Is there anything you didn’t like about the robot?"
              options={['Yes', 'No']}
              data={d.q13}
              setData={updateDislikes}
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
              setData={updateDislikes}
            />
            <Divider />
          </Grid>
          <Grid item>
            <Box height="20px" />
            <QuestionSelect
              question={`Did you like reading with ${robot}? Why?`}
              options={['Yes', 'No']}
              data={d.q15}
              setData={updateLikes}
            />
            <Divider />
          </Grid>
        </Grid>
      </Box>
    );
  }
}
