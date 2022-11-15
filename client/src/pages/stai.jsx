import React from "react";
import PropTypes from "prop-types";
import { Grid, Box, Divider } from "@material-ui/core";
import { Page, IntensityButtons } from "../components";

/** Page for STAI test.
 * @extends {Page}
 */
export default class STAI extends Page {
  render() {
    const { qId } = this.props;

    return (
      <Box m={5}>
        <Grid container direction="column" spacing={2}>
          <Grid item>
            <p>How much do you agree with each of these statements?</p>
          </Grid>
          <Grid item>
            <Divider />
          </Grid>
          <Grid item>
            <Box height="20px" />
            <IntensityButtons question="I feel calm" qId={`${qId}_calm`} />
          </Grid>
          <Grid item>
            <Divider />
          </Grid>
          <Grid item>
            <Box height="20px" />
            <IntensityButtons question="I am tense" qId={`${qId}_tense`} />
          </Grid>
          <Grid item>
            <Divider />
          </Grid>
          <Grid item>
            <Box height="20px" />
            <IntensityButtons question="I feel upset" qId={`${qId}_upset`} />
          </Grid>
          <Grid item>
            <Divider />
          </Grid>
          <Grid item>
            <Box height="20px" />
            <IntensityButtons
              question="I feel relaxed"
              qId={`${qId}_relaxed`}
            />
          </Grid>
          <Grid item>
            <Divider />
          </Grid>
          <Grid item>
            <Box height="20px" />
            <IntensityButtons
              question="I feel content"
              qId={`${qId}_content`}
            />
          </Grid>
          <Grid item>
            <Divider />
          </Grid>
          <Grid item>
            <Box height="20px" />
            <IntensityButtons
              question="I feel worried"
              qId={`${qId}_worried`}
            />
          </Grid>
          <Grid item>
            <Divider />
          </Grid>
        </Grid>
      </Box>
    );
  }
}

STAI.propTypes = {
  qId: PropTypes.string.isRequired,
};
