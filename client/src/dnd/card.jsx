import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Draggable } from 'react-beautiful-dnd';

const Container = styled.div`
  border: 1px solid lightgrey;
  border-radius: 4px;
  padding: 8px;
  margin-bottom: 8px;
  background-color: white;
`;

export default class Card extends React.Component {
  render() {
    const { card, index } = this.props;
    return (
      <Draggable draggableId={card.id} index={index}>
        {(provided) => (
          <Container
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
          >
            {card.content}
          </Container>
        )}
      </Draggable>
    );
  }
}

Card.propTypes = {
  card: PropTypes.objectOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
  })).isRequired,
  index: PropTypes.number.isRequired,
};
