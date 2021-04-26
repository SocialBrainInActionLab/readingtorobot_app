import React from 'react';
// import PropTypes from 'prop-types';
import styled from 'styled-components';
import { DragDropContext } from 'react-beautiful-dnd';
import Box from './box';

const data = {
  cards: {
    'card-1': { id: 'card-1', content: 'card 1' },
    'card-2': { id: 'card-2', content: 'card 2' },
    'card-3': { id: 'card-3', content: 'card 3' },
    'card-4': { id: 'card-4', content: 'card 4' },
    'card-5': { id: 'card-5', content: 'card 5' },
  },
  fields: {
    origin: {
      id: 'origin',
      title: 'Origin',
      cardIds: ['card-1', 'card-2', 'card-3', 'card-4', 'card-5'],
    },
    col1: {
      id: 'col1',
      title: 'Col1',
      cardIds: [],
    },
    col2: {
      id: 'col2',
      title: 'Col2',
      cardIds: [],
    },
    col3: {
      id: 'col3',
      title: 'Col3',
      cardIds: [],
    },
  },
  fieldOrder: ['origin', 'col1', 'col2', 'col3'],
};

const Container = styled.div`
  display: flex;
`;

export default class DragArea extends React.Component {
  constructor(props) {
    super(props);
    this.state = data;
    this.onDragEnd = this.onDragEnd.bind(this);
  }

  onDragEnd(result) {
    const { destination, source, draggableId } = result;
    const { fields } = this.state;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId
      && destination.index === source.index
    ) {
      return;
    }

    const start = fields[source.droppableId];
    const finish = fields[destination.droppableId];

    if (start === finish) {
      const newcardIds = Array.from(start.cardIds);
      newcardIds.splice(source.index, 1);
      newcardIds.splice(destination.index, 0, draggableId);

      const newField = {
        ...start,
        cardIds: newcardIds,
      };

      const newState = {
        ...this.state,
        fields: {
          ...fields,
          [newField.id]: newField,
        },
      };

      this.setState(newState);
      return;
    }

    const startCardIds = Array.from(start.cardIds);
    startCardIds.splice(source.index, 1);
    const newStart = {
      ...start,
      cardIds: startCardIds,
    };

    const finishCardIds = Array.from(finish.cardIds);
    finishCardIds.splice(destination.index, 0, draggableId);
    const newFinish = {
      ...finish,
      cardIds: finishCardIds,
    };

    const newState = {
      ...this.state,
      fields: {
        ...fields,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish,
      },
    };

    this.setState(newState);
  }

  render() {
    // const { state } = this.props;
    const { fieldOrder, fields, cards } = this.state;
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <Container>
          {fieldOrder.map((fieldId) => {
            const field = fields[fieldId];
            const cardIds = field.cardIds.map((cardId) => cards[cardId]);

            return (<Box key={field.id} box={field} cards={cardIds} />);
          })}
        </Container>
      </DragDropContext>
    );
  }
}

DragArea.propTypes = {
  // state: PropTypes.objectOf(PropTypes.shape()).isRequired,
};