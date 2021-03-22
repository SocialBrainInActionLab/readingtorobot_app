/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import {
  Box,
  Divider,
  Grid,
} from '@material-ui/core';
import ReactPlayer from 'react-player';

import Page from './page';
import Question from '../Question';

export class RobotVideoPage extends Page {
  static initialValues() {
    return {
      questions: '',
    };
  }

  handleChange(event) {
    const { setData, robotName } = this.props;
    const d = this.getState();
    d[`${robotName}Questions`] = event;
    setData(d);
  }

  getState() {
    let { data: d } = this.props;
    const { robotName } = this.props;
    if (d && Object.keys(d).length === 0) {
      d = {};
      d[`${robotName}Questions`] = '';
    }
    return d;
  }

  render() {
    const { url, robotName } = this.props;
    const d = this.getState();

    return (
      <Box m={5}>
        <Grid container direction="column" spacing={2} align="center">
          <Grid item>
            <Box height="20px" />
            <ReactPlayer url={url} controls />
          </Grid>
          <Grid item><Divider /></Grid>
          <Grid item>
            <Question
              question="Do you have any questions about this robot?"
              data={d[`${robotName}Questions`]}
              setData={this.handleChange}
            />
          </Grid>
        </Grid>
      </Box>
    );
  }
}

export default RobotVideoPage;
