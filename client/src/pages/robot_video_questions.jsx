/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import PropTypes from "prop-types";
import { Box, Divider, Grid } from "@material-ui/core";

import { IntensityButtons, Question, Page } from "../components";

/** Page including questions about the robot videos.
 * @extends {Page}
 */
export default class RobotVideoQuestionsPage extends Page {
  render() {
    const { name } = this.props;

    return (
      <Box m={5}>
        <Grid container direction="column" spacing={2}>
          <Grid item>
            <Question
              question="Do you have any questions about this robot?"
              qId={`${name}_AnyQ`}
            />
          </Grid>
          <Grid item>
            <Divider />
          </Grid>
          <Grid item>
            <Box height="20px" />
            <IntensityButtons
              question="How intelligent do you think this robot is?"
              qId={`${name}_Intelligent`}
            />
          </Grid>
          <Grid item>
            <Divider />
          </Grid>
          <Grid item>
            <Box height="20px" />
            <IntensityButtons
              question="How friendly do you think this robot is?"
              qId={`${name}_Friendly`}
            />
          </Grid>
        </Grid>
      </Box>
    );
  }
}

RobotVideoQuestionsPage.propTypes = {
  name: PropTypes.string.isRequired,
  ...Page.propTypes,
};
