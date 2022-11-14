import React from "react";
import QuestionaireContext from "./QuestionaireContext";

export default class Page extends React.Component {
  static initialValues() {
    return "";
  }

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    event.persist(); // allow native event access (see: https://facebook.github.io/react/docs/events.html)
    // give react a function to set the state asynchronously.
    // here it's using the "name" value set on the TextField
    // to set state.person.[firstname|lastname].
    const { update } = this.context;
    update(event.target.value);
  }

  getState() {
    let { data: d } = this.context;
    const { update } = this.context;
    if (!d || Object.keys(d).length === 0) {
      d = this.constructor.initialValues();
      update(d);
    }
    return d;
  }
}

Page.contextType = QuestionaireContext;
