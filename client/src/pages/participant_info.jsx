/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import {
  Box,
  Divider,
  Grid,
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
      date: '',
      name: '',
      phone: '',
      email: '',
      birthdate: '',
      age: '',
      gender: '',
      ethnicity: '',
      language: '',
    };
  }

  handleChange(id) {
    return (event) => {
      event.persist();
      const { setData } = this.props;
      const d = this.getState();
      d[id] = event.target.value;
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
                format="MM/dd/yyyy"
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
              value={d.number}
              onChange={updatePhone}
            />
          </Grid>

          <Grid item>
            <TextField
              label="email"
              variant="outlined"
              value={d.email}
              onChange={updateEmail}
            />
          </Grid>

          <Grid item><Divider /></Grid>

          <Grid item>
            <TextField
              label="birthdate"
              variant="outlined"
              value={d.birthdate}
              onChange={updateBirth}
            />
          </Grid>

          <Grid item>
            <TextField
              label="age"
              variant="outlined"
              type="number"
              value={d.age}
              onChange={updateAge}
            />
          </Grid>

          <Grid item><Divider /></Grid>

          <Grid item>
            <TextField
              label="gender"
              variant="outlined"
              value={d.gender}
              onChange={updateGender}
            />
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
