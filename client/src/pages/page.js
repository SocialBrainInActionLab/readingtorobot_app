import React from 'react';
import PropTypes from 'prop-types';

class Page extends React.Component {
  static initialValues() {
    return '';
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
    const { setData } = this.props;
    setData(event.target.value);
  }

  getState() {
    let { data: d } = this.props;
    if (!d) {
      d = Page.initialValues();
    }
    return d;
  }
}

Page.propTypes = {
  setData: PropTypes.func.isRequired,
  data: PropTypes.string,
};

Page.defaultProps = {
  data: '',
};

export default Page;
