/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import {
  Box,
  Divider,
  Grid,
} from '@material-ui/core';

import Page from './page';
import QuestionSelect from '../Question_select';

export class DemoPage3 extends Page {
  static initialValues() {
    return {
      dislikes: null,
      robot_or_teacher: null,
      like_robot: null,
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
    const updateDislikes = this.handleChange('dislikes');
    const updateRobotOrTeacher = this.handleChange('robot_or_teacher');
    const updateLikes = this.handleChange('like_robot');

    return (
      <Box m={5}>
        <Grid container direction="column" spacing={2}>
          <Grid item>
            <Box height="20px" />
            <QuestionSelect
              question="Is there anything you didn’t like about the robot?"
              options={['Yes', 'No']}
              data={d.dislikes}
              setData={updateDislikes}
            />
            <Divider />
          </Grid>
          <Grid item>
            <Box height="20px" />
            <QuestionSelect
              question="Would you prefer to read with this robot or your teacher? Why?"
              options={['Prefer Robots', 'Prefer Adult']}
              data={d.robot_or_teacher}
              setData={updateRobotOrTeacher}
            />
            <Divider />
          </Grid>
          <Grid item>
            <Box height="20px" />
            <QuestionSelect
              question={`Did you like reading with ${robot}? Why?`}
              options={['Yes', 'No']}
              data={d.like_robot}
              setData={updateLikes}
            />
            <Divider />
          </Grid>
        </Grid>
      </Box>
    );
  }
}

export default DemoPage3;
