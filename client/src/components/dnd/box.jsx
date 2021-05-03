import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Droppable } from 'react-beautiful-dnd';

import Card from './card';

const Container = styled.div`
  margin: 8px;
  width: ${(props) => (props.width ? props.width : '100%')};
  border-radius: 2px;
  margin: auto;

  display: flex;
  flex-direction: column;
  max-height: 100%;
`;

const CardList = styled.div`
  padding: 8px;
  border: ${(props) => (props.bordered ? 1 : 0)}px solid lightgrey;
  height: ${(props) => (props.bordered ? '220px' : '100%')};
  transition: background-color 0.2s ease;
  background-color: ${(props) => (props.isDraggingOver ? 'lightgrey' : 'white')};
  display: flex;
  flex-direction: ${(props) => props.direction};
  justify-content: center;
  align-items: center;
  min-height: ${(props) => (props.direction === 'column' ? '200px' : '100px')};
  border-radius: 8px;
`;

const DynamicList = styled.section`
  display: grid;
  grid-template-columns: repeat(2, auto);
  grid-auto-flow: ${(props) => (props.direction)};
  text-align: center;
  justify-content: center;
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
