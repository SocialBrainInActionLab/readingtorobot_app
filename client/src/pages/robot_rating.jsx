/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import LooksOneTwoToneIcon from '@material-ui/icons/LooksOneTwoTone';
import LooksTwoTwoToneIcon from '@material-ui/icons/LooksTwoTwoTone';
import Looks3TwoToneIcon from '@material-ui/icons/Looks3TwoTone';
import { Grid } from '@material-ui/core';

import { DragDropContext } from 'react-beautiful-dnd';
import DragArea, { Box } from '../components/dnd';

const Container = styled.div`
  display: flex;
  max-height: 100%;
  align-items: stretch;
`;

const PodBox = styled.div`
  max-height: 100%;
  align-items: stretch;
  border-top: 4px solid brown;
  border-bottom: 4px solid brown;

  border-left: ${(props) => (props.left ? 4 : 0)}px solid brown;
  border-right: ${(props) => (props.right ? 4 : 0)}px solid brown;
`;

const Image = styled.img`
  max-width: 70%;
`;

const initData = {
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
                    <LooksTwoTwoToneIcon style={{ fontSize: 80, color: 'black' }} />
                  </PodBox>
                </Grid>
                <Grid item xs={4}>
                  <PodBox left right>
                    <LooksOneTwoToneIcon style={{ fontSize: 120, color: 'black' }} />
                  </PodBox>
                </Grid>
                <Grid item xs={4}>
                  <PodBox right>
                    <Looks3TwoToneIcon style={{ fontSize: 60, color: 'black' }} />
                  </PodBox>
                </Grid>
              </Grid>
            </Grid>
            <Grid item>
              <Box
                max-width="100%"
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
  data: PropTypes.objectOf(PropTypes.shape()).isRequired,
  qId: PropTypes.string,
};
