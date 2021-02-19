import React from 'react';
import '../App.css';

class Page extends React.Component {
  constructor(props) {
    super(props);
    // onSubmit should push the data as json to the parent component. The parent should then manage the data of each
    // page
    this.onSubmit = props.onSubmitResponse;
  }
}

export {Page}
