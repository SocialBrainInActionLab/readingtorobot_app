import React from 'react';
import PropTypes from 'prop-types';
import './App.css';
import {
  Container,
  IconButton,
  Grid,
} from '@material-ui/core';
import Brightness1Icon from '@material-ui/icons/Brightness1';

class IntensityButtons extends React.Component {
  constructor(props) {
    super(props);
    this.onButtonClick = this.onButtonClick.bind(this);
  }

  onButtonClick(buttonId) {
    return () => {
      const { setData } = this.props;
      setData(buttonId);
    };
  }

  render() {
    const { question, data } = this.props;
    const variants = ['pink', 'pink', 'pink'];
    variants[data] = 'red';
    const onClick0 = this.onButtonClick(0);
    const onClick1 = this.onButtonClick(1);
    const onClick2 = this.onButtonClick(2);

    return (
      <Container>
        <p>
          {question}
        </p>
        <Grid container alignItems="center" justify="space-evenly">
          <Grid item>
            <IconButton onClick={onClick0}>
              <Brightness1Icon style={{ fontSize: 30, color: variants[0] }} />
            </IconButton>
          </Grid>

          <Grid item>
            <IconButton onClick={onClick1}>
              <Brightness1Icon style={{ fontSize: 80, color: variants[1] }} />
            </IconButton>
          </Grid>

          <Grid item>
            <IconButton onClick={onClick2}>
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
  data: PropTypes.string,
};

IntensityButtons.defaultProps = {
  data: null,
};

export default IntensityButtons;
