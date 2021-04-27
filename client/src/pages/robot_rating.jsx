/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import LooksOneTwoToneIcon from '@material-ui/icons/LooksOneTwoTone';
import LooksTwoTwoToneIcon from '@material-ui/icons/LooksTwoTwoTone';
import Looks3TwoToneIcon from '@material-ui/icons/Looks3TwoTone';
import { Grid } from '@material-ui/core';

import { DragDropContext } from 'react-beautiful-dnd';
import DragArea, { Box } from '../dnd';

const Container = styled.div`
  display: flex;
  height: 100%;
  align-items: stretch;
`;

const PodBox = styled.div`
  height: 100%;
  align-items: stretch;
  border-top: 4px solid brown;
  border-bottom: 4px solid brown;

  border-left: ${(props) => (props.left ? 4 : 0)}px solid brown;
  border-right: ${(props) => (props.right ? 4 : 0)}px solid brown;
`;

const Image = styled.img`
  height: 50%;
  width: 50%;
`;

const data = {
  cards: {
    Cozmo: { id: 'Cozmo', content: <Image src={`${process.env.PUBLIC_URL}/Cozmo.jpg`} alt="Cozmo" /> },
    MiRo: { id: 'MiRo', content: <Image src={`${process.env.PUBLIC_URL}/MiRo.jpg`} alt="MiRo" /> },
    NAO: { id: 'NAO', content: <Image src={`${process.env.PUBLIC_URL}/NAO.png`} alt="NAO" /> },
  },
  fields: {
    origin: {
      id: 'origin',
      title: '',
      cardIds: ['Cozmo', 'NAO', 'MiRo'],
    },
    first: {
      id: 'first',
      title: '',
      cardIds: [],
    },
    second: {
      id: 'second',
      title: '',
      cardIds: [],
    },
    third: {
      id: 'third',
      title: '',
      cardIds: [],
    },
  },
  fieldOrder: ['second', 'first', 'third'],
};

export default class RobotRating extends DragArea {
  constructor(props) {
    super(props);
    this.state = data;
  }

  onDragEnd(result) {
    const { setData } = this.props;
    const res = super.onDragEnd(result);
    if (res) {
      setData(
        Object.keys(res.fields).map((key) => {
          const d = {};
          d[key] = res.fields[key].cardIds;
          return d;
        }),
      );
    }
  }

  render() {
    const { fieldOrder, fields, cards } = this.state;
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <Grid container direction="column" alignItems="center">
          <Grid
            container
            direction="column"
            justify="space-between"
            style={{ width: '60vw' }}
          >
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
              <Grid
                container
                justify="space-around"
                alignItems="flex-end"
              >
                <Grid item xs={4}>
                  <PodBox left>
                    <LooksTwoTwoToneIcon style={{ fontSize: 100, color: 'black' }} />
                  </PodBox>
                </Grid>
                <Grid item xs={4}>
                  <PodBox left right>
                    <LooksOneTwoToneIcon style={{ fontSize: 150, color: 'black' }} />
                  </PodBox>
                </Grid>
                <Grid item xs={4}>
                  <PodBox right>
                    <Looks3TwoToneIcon style={{ fontSize: 70, color: 'black' }} />
                  </PodBox>
                </Grid>
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

RobotRating.propTypes = {
  state: PropTypes.objectOf(PropTypes.shape()).isRequired,
};
