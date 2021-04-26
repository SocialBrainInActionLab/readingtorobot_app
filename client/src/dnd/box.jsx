import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Droppable } from 'react-beautiful-dnd';

import Card from './card';

const Container = styled.div`
  margin: 8px;
  width: ${(props) => (props.width ? props.width : '100%')};
  border: 1px solid lightgrey;
  border-radius: 2px;
  margin: auto;

  display: flex;
  flex-direction: column;
`;
const Title = styled.h3`
  padding: 8px;
`;
const CardList = styled.div`
  padding: 8px;
  transition: background-color 0.2s ease;
  background-color: ${(props) => (props.isDraggingOver ? 'skyblue' : 'white')};
  display: flex;
  flex-direction: ${(props) => props.direction};
  justify-content: center;
  align-items: center;
`;

export default class Box extends React.Component {
  render() {
    const {
      box, cards, width, direction,
    } = this.props;
    return (
      <Container width={width}>
        <Title>{box.title}</Title>
        <Droppable droppableId={box.id} direction={direction}>
          {(provided, snapshot) => (
            <CardList
              ref={provided.innerRef}
              {...provided.droppableProps}
              isDraggingOver={snapshot.isDraggingOver}
              direction={direction === 'vertical' ? 'column' : 'row'}
            >
              {cards.map((card, index) => <Card key={card.id} card={card} index={index} />)}
              {provided.placeholder}
            </CardList>
          )}
        </Droppable>
      </Container>
    );
  }
}

Box.propTypes = {
  box: PropTypes.objectOf(PropTypes.shape()).isRequired,
  cards: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  width: PropTypes.number,
  direction: PropTypes.string,
};

Box.defaultProps = {
  width: null,
  direction: 'vertical',
};
