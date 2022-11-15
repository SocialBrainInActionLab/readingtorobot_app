import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { Droppable } from "react-beautiful-dnd";

import Card from "./card";

const Container = styled.div`
  position: relative
  border-radius: 2px;
  display: flex;
  flex-direction: column;
  width: ${(props) => (props.width ? props.width : "100%")};
  margin: auto;
  max-height: 100%;
`;

const CardList = styled.div`
  align-items: center;
  background-color: ${(props) =>
    props.isDraggingOver ? "rgba(100, 100, 100, 0.3)" : "transparent"};
  border: ${(props) => (props.bordered ? 1 : 0)}px solid lightgrey;
  border-radius: 8px;
  display: flex;
  flex-direction: ${(props) => props.direction};
  height: ${(props) => (props.bordered ? "220px" : "100%")};
  justify-content: center;
  min-height: ${(props) => (props.direction === "column" ? "200px" : "100px")};
  transition: background-color 0.2s ease;
  padding: 8px;
`;

const DynamicList = styled.section`
  display: grid;
  grid-template-columns: repeat(1, auto);
  grid-auto-flow: ${(props) => props.direction};
  justify-content: center;
  text-align: center;
`;

/** Drop area component.
 * @extends {React.Component}
 */
export default class Box extends React.Component {
  getDroppable() {
    const { box, cards, direction, bordered } = this.props;
    return (
      <Droppable droppableId={box.id} direction={direction}>
        {(provided, snapshot) => (
          <Container>
            <CardList
              bordered={bordered}
              ref={provided.innerRef}
              {...provided.droppableProps}
              isDraggingOver={snapshot.isDraggingOver}
              direction={direction === "vertical" ? "column" : "row"}
            >
              <DynamicList
                direction={direction === "vertical" ? "row" : "column"}
              >
                {cards.map((card, index) => (
                  <Card key={card.id} card={card} index={index} />
                ))}
                {provided.placeholder}
              </DynamicList>
            </CardList>
          </Container>
        )}
      </Droppable>
    );
  }

  render() {
    const { width, content, height, position } = this.props;
    return (
      <Container width={width} height={height}>
        {content}
        <div style={{ position }}>{this.getDroppable()}</div>
      </Container>
    );
  }
}

Box.propTypes = {
  box: PropTypes.objectOf(PropTypes.shape()).isRequired,
  cards: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  width: PropTypes.number,
  height: PropTypes.number,
  direction: PropTypes.string,
  bordered: PropTypes.bool,
  content: PropTypes.element,
  position: PropTypes.string,
};

Box.defaultProps = {
  width: null,
  height: null,
  direction: "vertical",
  bordered: false,
  content: null,
  position: null,
};
