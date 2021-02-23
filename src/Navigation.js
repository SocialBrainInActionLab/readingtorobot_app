import React from 'react';
import './App.css';
import { AppBar, Box, Button, MobileStepper,} from '@material-ui/core';
import {Question} from './Question.js'
import {Page} from './pages/page.js'

import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';


class Navigator extends React.Component {

  constructor(props) {
    super(props);
    if (!props.layout) {
      this.layout = [
        {dom: <Question question="Did you like the robot?" onSubmitResponse={this.handleResponse}/>,
         data: {}
        },
        {dom: <Question question="Why not?" onSubmitResponse={this.handleResponse}/>,
        data: {}
        }
      ]
    } else {
      this.layout = props.layout;
    }
    this.layout_length = this.layout.length

    this.state = {
      current: 0
    }
  }

  handleResponse = (value) => {
    this.layout[this.state.current].data = value;
  }

  handleNext = () => {
    this.setState({current: this.state.current + 1})
  }

  handleBack = () => {
    this.setState({current: this.state.current - 1})
  }

  render () {
    return (
      <Box height="85%" display="flex" flexDirection="column">
        <Box flex={1} overflow="auto">
          {this.layout[this.state.current].dom}
          <Box height="10vh"></Box>
        </Box>
        <AppBar style={{top: 'auto', bottom: 0}}>
          <MobileStepper
            variant="progress"
            steps={this.layout_length}
            position="static"
            activeStep={this.state.current}
            className={this.root}
            nextButton={
              <Button size="small" onClick={this.handleNext} disabled={this.state.current === this.layout_length - 1}>
                Next
                <KeyboardArrowRight />
              </Button>
            }
            backButton={
              <Button size="small" onClick={this.handleBack} disabled={this.state.current === 0}>
                <KeyboardArrowLeft />
                Back
              </Button>
            }/>
          </AppBar>
      </Box>
    )
  }
}

export {Navigator}
