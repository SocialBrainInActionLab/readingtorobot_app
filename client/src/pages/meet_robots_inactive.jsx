/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import {
  Box,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
} from '@material-ui/core';

import Page from './page';
import Question from '../Question';

export class MeetRobotsInactivePage extends Page {
  static initialValues() {
    return {
      q1: '',
      q2: '',
      q3: '',
      q4: '',
    };
  }

  handleChange(id) {
    return (event) => {
      const { setData } = this.props;
      const d = this.getState();

      if (typeof event === 'string' || event instanceof String) {
        d[id] = event;
      } else {
        event.persist();
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
    const updateMostLiked = this.handleChange('q1');
    const updateSecondMostLiked = this.handleChange('q3');
    const updateWhy = this.handleChange('q2');
    const updateQuestions = this.handleChange('q4');

    return (
      <Box m={5}>
        <Grid container direction="column" spacing={2}>
          <Grid item>
            <Box height="20px" />
            <p>
              Which robot do you like the best?
            </p>
            <FormControl variant="outlined" style={{ minWidth: 120 }}>
              <InputLabel id="q1" style={{ backgroundColor: '#FFFF' }}> Robot </InputLabel>
              <Select
                labelId="q1"
                id="q1"
                value={d.q1}
                defaultValue=""
                onChange={updateMostLiked}
              >
                <MenuItem value="miro">MiRo</MenuItem>
                <MenuItem value="nao">NAO</MenuItem>
                <MenuItem value="cozmo">Cozmo</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item><Divider /></Grid>
          <Grid item>
            <Question question="Why?" data={d.q2} setData={updateWhy} />
          </Grid>
          <Grid item><Divider /></Grid>
          <Grid item>
            <p>
              Out of the remaining two: Which robot do you like best?
            </p>
            <FormControl variant="outlined" style={{ minWidth: 120 }}>
              <InputLabel id="q3" style={{ backgroundColor: '#FFFF' }}> Robot </InputLabel>
              <Select
                labelId="q3"
                id="q3"
                value={d.q3}
                defaultValue=""
                onChange={updateSecondMostLiked}
              >
                <MenuItem value="miro">MiRo</MenuItem>
                <MenuItem value="nao">NAO</MenuItem>
                <MenuItem value="cozmo">Cozmo</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item>
            <Question
              question={
                    `You will get to see the robots in action later but first I’ll show you a video of each robot.
                    Do you have any q4?`
                  }
              data={d.q4}
              setData={updateQuestions}
            />
          </Grid>

        </Grid>
      </Box>
    );
  }
}

export default MeetRobotsInactivePage;
