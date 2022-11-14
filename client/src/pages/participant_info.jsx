/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import { Box, Grid, TextField } from "@material-ui/core";

import { Page, QuestionaireContext } from "../components";

/** Information about the participant. Currently only indicates the Participant ID.
 * @extends {Page}
 */
export default class ParticipantInfoPage extends Page {
  static initialValues() {
    return {
      id: "",
      date: new Date().toLocaleString(),
    };
  }

  handleChange(id) {
    return (event) => {
      const { update } = this.context;
      const d = this.getState();

      if (event instanceof Date) {
        d[id] = event;
      } else {
        event.persist();
        d[id] = event.target.value;
      }
      update(d);
    };
  }

  getState() {
    let { data: d } = this.context;
    if (!d || Object.keys(d).length === 0) {
      d = this.constructor.initialValues();
      this.context.update(d);
    }
    return d;
  }

  render() {
    const d = this.getState();

    return (
      <Box m={5}>
        <Grid container direction="column" spacing={2}>
          <Grid item>
            <Box height="20px" />
            <TextField
              label="Participant ID"
              variant="outlined"
              value={d.id}
              onChange={this.handleChange("id")}
            />
          </Grid>
        </Grid>
      </Box>
    );
  }
}

ParticipantInfoPage.contextType = QuestionaireContext;
