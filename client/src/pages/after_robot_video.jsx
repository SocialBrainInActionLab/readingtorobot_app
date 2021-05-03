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
import Question from '../components/Question';

export default class AfterRobotVideo extends Page {
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
    const updateMostLiked = this.handleChange('q5');
    const updateWhy = this.handleChange('q6');

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
                value={d.q5}
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
            <Question question="Why?" data={d.q6} setData={updateWhy} />
          </Grid>
        </Grid>
      </Box>
    );
  }
}
