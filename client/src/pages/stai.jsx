/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
// import PropTypes from 'prop-types';
import styled from 'styled-components';
import Brightness1Icon from '@material-ui/icons/Brightness1';
import { Grid } from '@material-ui/core';

import { DragDropContext } from 'react-beautiful-dnd';
import DragArea, { Box } from '../dnd';

const Container = styled.div`
  display: flex;
  height: 100%;
  align-items: stretch;
`;

const Image = styled.img`
  height: 50%;
  width: 50%;
`;

const data = {
  cards: {
    'card-1': { id: 'card-1', content: <Image src={`${process.env.PUBLIC_URL}/calm_face.gif`} alt="calm" /> },
    'card-2': { id: 'card-2', content: <Image src={`${process.env.PUBLIC_URL}/happy_face.gif`} alt="happy" /> },
    'card-3': { id: 'card-3', content: <Image src={`${process.env.PUBLIC_URL}/sad_face.gif`} alt="sad" /> },
    'card-4': { id: 'card-4', content: <Image src={`${process.env.PUBLIC_URL}/upset_face.gif`} alt="upset" /> },
  },
  fields: {
    origin: {
      id: 'origin',
      title: '',
      cardIds: ['card-1', 'card-2', 'card-3', 'card-4'],
    },
    col1: {
      id: 'col1',
      title: '',
      cardIds: [],
    },
    col2: {
      id: 'col2',
      title: '',
      cardIds: [],
    },
    col3: {
      id: 'col3',
      title: '',
      cardIds: [],
    },
  },
  fieldOrder: ['col1', 'col2', 'col3'],
};

export default class STAI extends DragArea {
  constructor(props) {
    super(props);
    this.state = data;
  }

  render() {
    // const { state } = this.props;
    const { fieldOrder, fields, cards } = this.state;
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <Grid
          container
          direction="column"
          justify="space-between"
          alignItems="stretch"
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
                <Brightness1Icon style={{ fontSize: 80, color: 'red' }} />
              </Grid>
              <Grid item xs={4}>
                <Brightness1Icon style={{ fontSize: 150, color: 'red' }} />
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Container>
              {fieldOrder.map((fieldId) => {
                const field = fields[fieldId];
                const cardIds = field.cardIds.map((cardId) => cards[cardId]);

                return (<Box key={field.id} box={field} cards={cardIds} />);
              })}
            </Container>
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
      </DragDropContext>
    );
  }
}

STAI.propTypes = {
  // state: PropTypes.objectOf(PropTypes.shape()).isRequired,
};
