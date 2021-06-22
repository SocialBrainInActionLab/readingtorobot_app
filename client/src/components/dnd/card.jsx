import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Draggable } from 'react-beautiful-dnd';

const Container = styled.div`
  align-items: center;
  background-color: transparent;
  border-radius: 4px;
  display: flex;
  justify-content: center;
  margin-bottom: 8px;
  max-width: 150px;
  padding: 8px;
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
