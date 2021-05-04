/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Brightness1Icon from '@material-ui/icons/Brightness1';
import { Grid } from '@material-ui/core';

import { DragDropContext } from 'react-beautiful-dnd';
import DragArea, { Box } from '../components/dnd';

const Image = styled.img`
  max-width: 60%;
`;

const initData = {
  cards: {
    calm: { id: 'calm', content: <Image src={`${process.env.PUBLIC_URL}/calm_face.gif`} alt="calm" /> },
    happy: { id: 'happy', content: <Image src={`${process.env.PUBLIC_URL}/happy_face.gif`} alt="happy" /> },
    sad: { id: 'sad', content: <Image src={`${process.env.PUBLIC_URL}/sad_face.gif`} alt="sad" /> },
    upset: { id: 'upset', content: <Image src={`${process.env.PUBLIC_URL}/upset_face.gif`} alt="upset" /> },
  },
  fields: {
    origin: {
      id: 'origin',
      title: '',
      cardIds: ['calm', 'happy', 'sad', 'upset'],
    },
    low: {
      id: 'low',
      title: '',
      cardIds: [],
    },
    mid: {
      id: 'mid',
      title: '',
      cardIds: [],
    },
    high: {
      id: 'high',
      title: '',
      cardIds: [],
    },
  },
  fieldOrder: ['low', 'mid', 'high'],
};

export default class STAI extends DragArea {
  constructor(props) {
    super(props);
    this.state = initData;
  }

  onDragEnd(result) {
    const { qId, setData } = this.props;
    const res = super.onDragEnd(result);
    if (res) {
      const data = {};
      data[qId] = Object
        .keys(res.fields)
        .map((key) => {
          const d = {};
          d[key] = res.fields[key].cardIds;
          return d;
        });
      setData(data);
    }
  }

  getFields() {
    const { fields } = this.state;
    const { qId, data } = this.props;
    if (qId !== undefined && data[qId]) {
      data[qId].forEach((entry) => {
        const key = Object.keys(entry)[0];
        fields[key].cardIds = entry[key];
      });
    }
    return fields;
  }

  render() {
    const { fieldOrder, cards } = this.state;
    const fields = this.getFields();

    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <Grid container direction="column" alignItems="center">

          <Grid
            container
            direction="column"
            justify="space-between"
            alignItems="stretch"
            style={{ width: '80vw' }}
          >
            <Grid item>
              <Grid
                container
                justify="space-around"
                alignItems="center"
              >
                <Grid item xs={4}>
                  <Brightness1Icon style={{ fontSize: 30, color: 'red' }} />
                </Grid>
                <Grid item xs={4}>
                  <Brightness1Icon style={{ fontSize: 70, color: 'red' }} />
                </Grid>
                <Grid item xs={4}>
                  <Brightness1Icon style={{ fontSize: 140, color: 'red' }} />
                </Grid>
              </Grid>
            </Grid>
            <Grid item>
              <Grid
                container
                justify="space-around"
                alignItems="stretch"
              >
                {fieldOrder.map((fieldId) => {
                  const field = fields[fieldId];
                  const cardIds = field.cardIds.map((cardId) => cards[cardId]);

                  return (
                    <Grid item xs={4}>
                      <Box key={field.id} box={field} cards={cardIds} bordered />
                    </Grid>
                  );
                })}
              </Grid>
            </Grid>
            <Grid item>
              <Box
                width="100%"
                direction="horizontal"
                key={fields.origin.id}
                box={fields.origin}
                cards={fields.origin.cardIds.map((cardId) => cards[cardId])}
              />
            </Grid>
          </Grid>
        </Grid>
      </DragDropContext>
    );
  }
}

STAI.propTypes = {
  state: PropTypes.objectOf(PropTypes.shape()).isRequired,
};
