/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import { Box } from "@material-ui/core";

import { IntensityButtons, Page } from "../components";

/** Question about the experimenter presence.
 * @extends {Page}
 */
export default class ExperimenterQuestionPage extends Page {
  getState() {
    const { data } = this.context;
    return data.chosen || "the robot";
  }

  render() {
    const robot = this.getState();

    return (
      <Box m={5}>
        <IntensityButtons
          question={`How much were you thinking about the experimenter (e.g., Ryssa) when you were reading with ${robot}?`}
          qId="ExperimenterPresence_R"
        />
      </Box>
    );
  }
}
