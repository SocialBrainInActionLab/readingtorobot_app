
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import {Page} from './page.js';


export class ParticipantInfoPage extends Page {
  constructor(props) {
    super(props);
    if (!props.data) {
      this.state = {
        id: "",
        date: "",
        name: "",
        phone: "",
        email: "",
        birthdate: "",
        age: "",
        gender: "",
        ethnicity: "",
        language: "",
      }
    } else {
      this.state = {
        id: props.data.id,
        date: props.data.date,
        name: props.data.name,
        phone: props.data.phone,
        email: props.data.email,
        birthdate: props.data.birthdate,
        age: props.data.age,
        gender: props.data.gender,
        ethnicity: props.data.ethnicity,
        language: props.data.language,
      }
    }
  }

  render () {
    return (
      <div className={"classes.root"}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper className={"classes.paper"}>xs=12</Paper>
          </Grid>
          <Grid item xs={6}>
            <Paper className={"classes.paper"}>xs=6</Paper>
          </Grid>
          <Grid item xs={6}>
            <Paper className={"classes.paper"}>xs=6</Paper>
          </Grid>
          <Grid item xs={3}>
            <Paper className={"classes.paper"}>xs=3</Paper>
          </Grid>
          <Grid item xs={3}>
            <Paper className={"classes.paper"}>xs=3</Paper>
          </Grid>
          <Grid item xs={3}>
            <Paper className={"classes.paper"}>xs=3</Paper>
          </Grid>
          <Grid item xs={3}>
            <Paper className={"classes.paper"}>xs=3</Paper>
          </Grid>
        </Grid>
      </div>
    )
  }

}
