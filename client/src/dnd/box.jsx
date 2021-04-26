import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Droppable } from 'react-beautiful-dnd';

import Card from './card';

const Container = styled.div`
  margin: 8px;
  width: 220px;
  border: 1px solid lightgrey;
  border-radius: 2px;

  display: flex;
  flex-direction: column;
`;
const Title = styled.h3`
  padding: 8px;
`;
const cardList = styled.div`
  padding: 8px;
  flex-grow: 1;
  min-height: 100px;
`;

export default class Box extends React.Component {
  render() {
    const { box, cards } = this.props;
    return (
      <Container>
        <Title>{box.title}</Title>
        <Droppable droppableId={box.id}>
          {(provided) => (
            <cardList
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {cards.map((card, index) => <Card key={card.id} card={card} index={index} />)}
              {provided.placeholder}
            </cardList>
          )}
        </Droppable>
      </Container>
    );
  }
}

Box.propTypes = {
  box: PropTypes.objectOf(PropTypes.shape()).isRequired,
  cards: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};
