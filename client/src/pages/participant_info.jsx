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
  TextField,
} from '@material-ui/core';
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

import { Page, QuestionaireContext } from '../components';

export default class ParticipantInfoPage extends Page {
  static initialValues() {
    return {
      id: '',
      date: new Date(Date.now()),
      name: '',
      phone: '',
      email: '',
      birthdate: new Date(Date.now() - 86400000),
      age: '',
      gender: '',
      ethnicity: '',
      language: '',
    };
  }

  constructor(props) {
    super(props);
    this.handleBirthdateChange = this.handleBirthdateChange.bind(this);
    this.handleEthnicityChoice = this.handleEthnicityChoice.bind(this);
    this.state = { ethOther: false };
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

  handleEthnicityChoice(event) {
    event.persist();
    const updateEthnicity = this.handleChange('ethnicity');
    updateEthnicity(event);
    if (event.target.value.toLowerCase() === 'other') {
      this.setState({ ethOther: true });
    } else {
      this.setState({ ethOther: false });
    }
  }

  handleBirthdateChange(event) {
    if (event != null) {
      const { setData } = this.props;
      const d = this.getState();
      d.birthdate = event;
      d.age = Math.abs((new Date(Date.now() - event.getTime())).getUTCFullYear() - 1970);
      setData(d);
    }
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
    const { ethOther } = this.state;

    return (
      <Box m={5}>
        <Grid container direction="column" spacing={2}>
          <Grid item>
            <Box height="20px" />
            <TextField
              label="Participant ID"
              variant="outlined"
              value={d.id}
              onChange={this.handleChange('id')}
            />
          </Grid>

          <Grid item>
            <Box height="20px" />
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                margin="normal"
                id="date-picker-dialog"
                label="Date"
                format="dd/MM/yyyy"
                value={d.date}
                onChange={this.handleChange('date')}
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
              />
            </MuiPickersUtilsProvider>
          </Grid>
          <Grid item><Divider /></Grid>
          <Grid item>
            <TextField
              label="Name"
              variant="outlined"
              value={d.name}
              onChange={this.handleChange('name')}
            />
          </Grid>

          <Grid item><Divider /></Grid>

          <Grid item>
            <TextField
              label="Phone number"
              variant="outlined"
              type="number"
              inputProps={{ inputMode: 'tel' }}
              value={d.phone}
              onChange={this.handleChange('phone')}
            />
          </Grid>

          <Grid item>
            <TextField
              label="email"
              variant="outlined"
              type="email"
              inputProps={{ inputMode: 'email' }}
              value={d.email}
              onChange={this.handleChange('email')}
            />
          </Grid>

          <Grid item><Divider /></Grid>

          <Grid item>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                margin="normal"
                id="date-picker-dialog"
                label="Birthdate"
                format="dd/MM/yyyy"
                value={d.birthdate}
                disableFuture
                onChange={this.handleBirthdateChange}
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
              />
            </MuiPickersUtilsProvider>

          </Grid>

          <Grid item>
            <TextField
              label="age"
              variant="outlined"
              type="number"
              inputProps={{ inputMode: 'decimal' }}
              value={d.age}
              onChange={this.handleChange('age')}
            />
          </Grid>

          <Grid item><Divider /></Grid>

          <Grid item>
            <FormControl variant="outlined" style={{ minWidth: 120 }}>
              <InputLabel id="gender" style={{ backgroundColor: '#FFFF' }}> Gender </InputLabel>
              <Select
                labelId="gender"
                id="gender"
                value={d.gender}
                onChange={this.handleChange('gender')}
              >
                <MenuItem value="M">Male</MenuItem>
                <MenuItem value="F">Female</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item>
            <Grid container direction="row" justify="center" spacing={2}>
              <Grid item>
                <FormControl variant="outlined" style={{ minWidth: 120 }}>
                  <InputLabel id="ethnicity" style={{ backgroundColor: '#FFFF' }}> Ethnicity </InputLabel>
                  <Select
                    labelId="ethnicity"
                    id="ethnicity"
                    value={ethOther ? 'Other' : d.ethnicity}
                    onChange={this.handleEthnicityChoice}
                  >
                    <MenuItem value="Aboriginal">Aboriginal</MenuItem>
                    <MenuItem value="Torres Strait Islander">Torres Strait Islander</MenuItem>
                    <MenuItem value="Caucasian">Caucasian</MenuItem>
                    <MenuItem value="South Asian">South Asian</MenuItem>
                    <MenuItem value="South East Asian">South East Asian</MenuItem>
                    <MenuItem value="Middle Eastern">Middle Eastern</MenuItem>
                    <MenuItem value="African">African</MenuItem>
                    <MenuItem value="Hispanic">Hispanic</MenuItem>
                    <MenuItem value="Other">Other</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item>
                {ethOther ? (
                  <TextField
                    label="Please specify"
                    variant="outlined"
                    value={d.ethnicity.toLowerCase() === 'other' ? '' : d.ethnicity}
                    onChange={this.handleChange('ethnicity')}
                  />
                ) : <div />}
              </Grid>
            </Grid>
          </Grid>
          <Divider />

          <Grid item>
            <TextField
              label="language"
              variant="outlined"
              value={d.language}
              onChange={this.handleChange('language')}
            />
          </Grid>
        </Grid>
      </Box>
    );
  }
}

ParticipantInfoPage.contextType = QuestionaireContext;
