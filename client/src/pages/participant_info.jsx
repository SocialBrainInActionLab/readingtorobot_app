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

import Page from './page';

export class ParticipantInfoPage extends Page {
  static initialValues() {
    return {
      id: '',
      date: new Date(),
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

  handleChange(id) {
    return (event) => {
      const { setData } = this.props;
      const d = this.getState();

      if (event instanceof Date) {
        d[id] = event;
      } else {
        event.persist();
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
    const d = this.getState();
    const updateId = this.handleChange('id');
    const updateDate = this.handleChange('date');
    const updateName = this.handleChange('name');
    const updatePhone = this.handleChange('phone');
    const updateEmail = this.handleChange('email');
    const updateBirth = this.handleChange('birthdate');
    const updateAge = this.handleChange('age');
    const updateGender = this.handleChange('gender');
    const updateEthnicity = this.handleChange('ethnicity');
    const updateLanguage = this.handleChange('language');

    return (
      <Box m={5}>
        <Grid container direction="column" spacing={2}>
          <Grid item>
            <Box height="20px" />
            <TextField
              label="Participant ID"
              variant="outlined"
              value={d.id}
              onChange={updateId}
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
                onChange={updateDate}
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
              onChange={updateName}
            />
          </Grid>

          <Grid item><Divider /></Grid>

          <Grid item>
            <TextField
              label="Phone number"
              variant="outlined"
              type="number"
              inputProps={{ inputMode: 'tel' }}
              value={d.number}
              onChange={updatePhone}
            />
          </Grid>

          <Grid item>
            <TextField
              label="email"
              variant="outlined"
              type="email"
              inputProps={{ inputMode: 'email' }}
              value={d.email}
              onChange={updateEmail}
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
                onChange={updateBirth}
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
              onChange={updateAge}
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
                onChange={updateGender}
              >
                <MenuItem value="M">Male</MenuItem>
                <MenuItem value="F">Female</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item>
            <TextField
              label="ethnicity"
              variant="outlined"
              value={d.ethnicity}
              onChange={updateEthnicity}
            />
          </Grid>

          <Divider />

          <Grid item>
            <TextField
              label="language"
              variant="outlined"
              value={d.language}
              onChange={updateLanguage}
            />
          </Grid>
        </Grid>
      </Box>
    );
  }
}

export default ParticipantInfoPage;
