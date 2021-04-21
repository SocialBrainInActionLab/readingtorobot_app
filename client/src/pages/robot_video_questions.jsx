/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import {
  Box,
  Divider,
  Grid,
} from '@material-ui/core';

import Page from './page';
import Question from '../Question';
import IntensityButtons from '../IntensityButtons';

export class RobotVideoQuestionsPage extends Page {
  static initialValues() {
    return {
      questions: '',
    };
  }

  handleChange(qId) {
    return (event) => {
      const { setData } = this.props;
      const d = this.getState();
      d[qId] = event;
      setData(d);
    };
  }

  getState() {
    let { data: d } = this.props;
    const { robotName } = this.props;
    if (d && Object.keys(d).length === 0) {
      d = {};
      d[`${robotName}_q1`] = '';
      d[`${robotName}_q2`] = '';
      d[`${robotName}_q3`] = '';
    }
    return d;
  }

  render() {
    const { robotName } = this.props;
    const d = this.getState();

    return (
      <Box m={5}>
        <Grid container direction="column" spacing={2} align="center">
          <Grid item>
            <Question
              question="Do you have any questions about this robot?"
              data={d[`${robotName}_q1`]}
              setData={this.handleChange(`${robotName}_q1`)}
            />
          </Grid>
          <Grid item><Divider /></Grid>
          <Grid item>
            <Box height="20px" />
            <IntensityButtons
              question="How intelligent do you think this robot is?"
              data={d[`${robotName}_q2`]}
              setData={this.handleChange(`${robotName}_q2`)}
            />
          </Grid>
          <Grid item><Divider /></Grid>
          <Grid item>
            <Box height="20px" />
            <IntensityButtons
              question="How friendly do you think this robot is?"
              data={d[`${robotName}_q3`]}
              setData={this.handleChange(`${robotName}_q3`)}
            />
          </Grid>
        </Grid>
      </Box>
    );
  }
}

export default RobotVideoQuestionsPage;
