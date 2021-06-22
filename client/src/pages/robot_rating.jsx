/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import styled from 'styled-components';
import { Grid } from '@material-ui/core';

import { DragDropContext } from 'react-beautiful-dnd';
import DragArea, { Box } from '../components/dnd';
import { shuffle } from '../utils';

const Container = styled.div`
  display: flex;
  max-height: 100%;
  align-items: stretch;
`;

const Image = styled.img`
  max-width: 70%;
`;

const initData = {
  cards: {
    first: { id: 'first', content: <Image src={`${process.env.PUBLIC_URL}/rib1st.png`} alt="first" /> },
    second: { id: 'second', content: <Image src={`${process.env.PUBLIC_URL}/rib2nd.png`} alt="second" /> },
    third: { id: 'third', content: <Image src={`${process.env.PUBLIC_URL}/rib3rd.png`} alt="third" /> },
  },
  fields: {
    origin: {
      id: 'origin',
      title: '',
      cardIds: ['first', 'second', 'third'],
    },
    cozmo: {
      id: 'cozmo',
      title: '',
      cardIds: [],
    },
    miro: {
      id: 'miro',
      title: '',
      cardIds: [],
    },
    nao: {
      id: 'nao',
      title: '',
      cardIds: [],
    },
  },
  fieldOrder: shuffle(['cozmo', 'miro', 'nao']),
};

export default class RobotRating extends DragArea {
  constructor(props) {
    super(props);
    this.state = initData;
  }

  render() {
    const { fieldOrder, cards } = this.state;
    const fields = this.getFields();

    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <Grid container direction="column" alignItems="center">
          <Grid
            container
            direction="row"
            justify="space-between"
            style={{ width: '60vw' }}
          >
            <Grid item>
              <Box
                direction="vertical"
                key={fields.origin.id}
                box={fields.origin}
                cards={fields.origin.cardIds.map((cardId) => cards[cardId])}
              />
            </Grid>
            <Grid item>
              <Container>
                {fieldOrder.map((fieldId) => {
                  const field = fields[fieldId];
                  const cardIds = field.cardIds.map((cardId) => cards[cardId]);

                  return (
                    <Box
                      key={field.id}
                      box={field}
                      cards={cardIds}
                      content={(
                        <Image
                          src={`${process.env.PUBLIC_URL}/${field.id}.png`}
                          alt={field.id}
                          style={{
                            position: 'absolute', height: '30vh', zIndex: -1,
                          }}
                        />
)}
                    />
                  );
                })}
              </Container>
            </Grid>
          </Grid>
        </Grid>
      </DragDropContext>
    );
  }
}
