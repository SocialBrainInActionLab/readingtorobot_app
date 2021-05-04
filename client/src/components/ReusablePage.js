import Page from './Page';

export default class ReusablePage extends Page {
  static initialValues(name) {
    const d = {};
    d[name] = '';
    return d;
  }
}
