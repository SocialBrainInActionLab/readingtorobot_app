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
  handleChange(event) {
    const { setData } = this.props;
    setData(event);
  }

  render() {
    const { url } = this.props;
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
              data={d.questions}
              setData={this.handleChange}
            />
          </Grid>
        </Grid>
      </Box>
    );
  }
}

export default RobotVideoPage;
