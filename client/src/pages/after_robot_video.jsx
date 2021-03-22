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

export class AfterRobotVideo extends Page {
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
    if (d && Object.keys(d).length === 0) {
      d = this.constructor.initialValues();
    }
    return d;
  }

  render() {
    const d = this.getState();
    const updateMostLiked = this.handleChange('mostLiked');
    const updateWhy = this.handleChange('why');

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
        </Grid>
      </Box>
    );
  }
}

export default AfterRobotVideo;
