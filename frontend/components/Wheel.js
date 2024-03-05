// Wheel.js
import React, { useState } from 'react'
import { connect } from 'react-redux';
import { moveClockwise, moveCounterClockwise } from '../state/action-creators';

function Wheel(props) {
  const { activeCogIndex, moveClockwise, moveCounterClockwise } = props;


  return (
    <div id="wrapper">
      <div id="wheel">
        {Array.from({ length: 6 }, (_, index) => (
          <div
            key={index}
            className={`cog ${index === activeCogIndex ? 'active' : ''}`}
            style={{ '--i': index }}
          >
            {index === activeCogIndex ? 'B' : null}
          </div>
        ))}
      </div>
      <div id="keypad">
      <button id="counterClockwiseBtn" onClick={moveCounterClockwise}>Counter clockwise</button>
        <button id="clockwiseBtn" onClick={moveClockwise}>Clockwise</button>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  activeCogIndex: state.wheel.activeCogIndex
});

const mapDispatchToProps = {
  moveClockwise,
  moveCounterClockwise
};

export default connect(mapStateToProps, mapDispatchToProps)(Wheel);
