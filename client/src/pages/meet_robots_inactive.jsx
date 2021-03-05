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
      mostLiked: '',
      why: '',
      secondMostLiked: '',
      questions: '',
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
    const updateMostLiked = this.handleChange('mostLiked');
    const updateSecondMostLiked = this.handleChange('secondMostLiked');
    const updateWhy = this.handleChange('why');
    const updateQuestions = this.handleChange('questions');

    return (
      <Box m={5}>
        <Grid container direction="column" spacing={2}>
          <Grid item>
            <Box height="20px" />
            <p>
              Which robot do you like the best?
            </p>
            <FormControl variant="outlined" style={{ minWidth: 120 }}>
              <InputLabel id="mostLiked" style={{ backgroundColor: '#FFFF' }}> Robot </InputLabel>
              <Select
                labelId="mostLiked"
                id="mostLiked"
                value={d.mostLiked}
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
            <Question question="Why?" data={d.why} setData={updateWhy} />
          </Grid>
          <Grid item><Divider /></Grid>
          <Grid item>
            <p>
              Out of the remaining two: Which robot do you like best?
            </p>
            <FormControl variant="outlined" style={{ minWidth: 120 }}>
              <InputLabel id="secondMostLiked" style={{ backgroundColor: '#FFFF' }}> Robot </InputLabel>
              <Select
                labelId="secondMostLiked"
                id="secondMostLiked"
                value={d.secondMostLiked}
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
                    Do you have any questions?`
                  }
              data={d.questions}
              setData={updateQuestions}
            />
          </Grid>

        </Grid>
      </Box>
    );
  }
}

export default MeetRobotsInactivePage;
