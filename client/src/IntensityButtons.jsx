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
      const { setData, qId } = this.props;
      if (qId !== null) {
        const res = {};
        res[qId] = buttonId;
        setData(res);
      } else {
        setData(buttonId);
      }
    };
  }

  render() {
    const { question, qId } = this.props;
    let { data } = this.props;
    const variants = ['pink', 'pink', 'pink'];
    let id = data;
    if (qId) {
      if (data === null) {
        data = {};
        data[qId] = '';
      }
      id = data[qId];
    }
    variants[id] = 'red';
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
  qId: PropTypes.string,
};

IntensityButtons.defaultProps = {
  data: null,
  qId: null,
};

export default IntensityButtons;
