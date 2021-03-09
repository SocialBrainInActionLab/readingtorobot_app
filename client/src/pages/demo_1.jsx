/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import {
  Box,
  Divider,
  Grid,
} from '@material-ui/core';

import Page from './page';
import Question from '../Question';
import QuestionSelect from '../Question_select';

export class DemoPage1 extends Page {
  static initialValues() {
    return {
      q5: '',
      q6: '',
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
    const d = this.getState();
    const updateHowWasIt = this.handleChange('q5');
    const updateHelpful = this.handleChange('q6');

    return (
      <Box m={5}>
        <Grid container direction="column" spacing={2}>
          <Grid item>
            <Box height="20px" />
            <Question
              question="How was that? What do you think about this robot?"
              data={d.q5}
              setData={updateHowWasIt}
            />
          </Grid>
          <Grid item><Divider /></Grid>
          <Grid item>
            <QuestionSelect
              question="Do you think this is a helpful robot? Why (if not) / HOW (if so)?"
              options={['Yes', 'No']}
              data={d.q6}
              setData={updateHelpful}
            />
          </Grid>
        </Grid>
      </Box>
    );
  }
}

export default DemoPage1;