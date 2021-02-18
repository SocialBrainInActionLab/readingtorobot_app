import React from 'react';
import './App.css';
import {Navigator} from './Navigation.js'


class Base extends React.Component {
  constructor(props) {
    super(props);
    // TODO: Populate results from formularies
    this.results = {};
  }

  render () {
    return (
      <div className="App">
        <Navigator/>
      </div>
    )
  }
}


function App() {

  return (
      <Base></Base>
  );
}

export default App;
