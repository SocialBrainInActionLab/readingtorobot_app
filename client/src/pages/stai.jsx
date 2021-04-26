/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import Page from './page';
import DragArea from '../dnd';

export default class STAI extends Page {
  render() {
    return (
      <DragArea />
    );
  }
}
