import React from 'react';
import PropTypes from 'prop-types';
import {
  Container,
  IconButton,
  Grid,
  Box,
} from '@material-ui/core';
import Brightness1Icon from '@material-ui/icons/Brightness1';

class IntensityButtons extends React.Component {
  constructor(props) {
    super(props);
    this.onButtonClick = this.onButtonClick.bind(this);
  }

  onButtonClick(buttonId) {
    return () => {
      const { setData, qId } = this.props;
      const res = {};
      res[qId] = buttonId;
      setData(res);
    };
  }

  getState() {
    const { data, qId } = this.props;
    const variants = ['pink', 'pink', 'pink'];
    if (data[qId] >= 0) {
      variants[data[qId]] = 'red';
    } else {
      data[qId] = -1;
    }
    return variants;
  }

  render() {
    const { question } = this.props;
    const variants = this.getState();

    return (
      <Container>
        <Box height="5vh" />
        <p>
          {question}
        </p>
        <Grid container alignItems="center" justify="space-evenly">
          <Grid item>
            <IconButton onClick={this.onButtonClick(0)}>
              <Brightness1Icon style={{ fontSize: 30, color: variants[0] }} />
            </IconButton>
          </Grid>

          <Grid item>
            <IconButton onClick={this.onButtonClick(1)}>
              <Brightness1Icon style={{ fontSize: 80, color: variants[1] }} />
            </IconButton>
          </Grid>

          <Grid item>
            <IconButton onClick={this.onButtonClick(2)}>
              <Brightness1Icon style={{ fontSize: 150, color: variants[2] }} />
            </IconButton>
          </Grid>
        </Grid>
      </Container>
    );
  }
}

IntensityButtons.propTypes = {
  setData: PropTypes.func.isRequired,
  question: PropTypes.string.isRequired,
  data: PropTypes.string.isRequired,
  qId: PropTypes.string.isRequired,
};

export default IntensityButtons;