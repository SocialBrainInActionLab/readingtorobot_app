import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Droppable } from 'react-beautiful-dnd';

import Card from './card';

const Container = styled.div`
  border-radius: 2px;
  display: flex;
  flex-direction: column;
  width: ${(props) => (props.width ? props.width : '100%')};
  margin: auto;
  max-height: 100%;
`;

const CardList = styled.div`
  align-items: center;
  background-color: ${(props) => (props.isDraggingOver ? 'lightgrey' : 'white')};
  border: ${(props) => (props.bordered ? 1 : 0)}px solid lightgrey;
  border-radius: 8px;
  display: flex;
  flex-direction: ${(props) => props.direction};
  height: ${(props) => (props.bordered ? '220px' : '100%')};
  justify-content: center;
  min-height: ${(props) => (props.direction === 'column' ? '200px' : '100px')};
  transition: background-color 0.2s ease;
  padding: 8px;
`;

const DynamicList = styled.section`
  display: grid;
  grid-template-columns: repeat(2, auto);
  grid-auto-flow: ${(props) => (props.direction)};
  justify-content: center;
  text-align: center;
`;

export default class Box extends React.Component {
  render() {
    const {
      box, cards, width, direction, bordered,
    } = this.props;
    return (
      <Container width={width}>
        <Droppable droppableId={box.id} direction={direction}>
          {(provided, snapshot) => (
            <CardList
              bordered={bordered}
              ref={provided.innerRef}
              {...provided.droppableProps}
              isDraggingOver={snapshot.isDraggingOver}
              direction={direction === 'vertical' ? 'column' : 'row'}
            >
              <DynamicList direction={direction === 'vertical' ? 'row' : 'column'}>
                {cards.map((card, index) => <Card key={card.id} card={card} index={index} />)}
                {provided.placeholder}
              </DynamicList>
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
  bordered: PropTypes.bool,
};

Box.defaultProps = {
  width: null,
  direction: 'vertical',
  bordered: false,
};
