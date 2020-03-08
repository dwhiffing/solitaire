import React from 'react'
import { Motion, spring } from 'react-motion'

export const Card = ({
  isActive,
  isCheat,
  value,
  index,
  deckIndex,
  cardPileIndex,
  pileIndex,
  onMouseDown,
  onMouseUp,
  isEmpty,
  canMove,
  onTouchStart,
  cursorState,
}) => {
  const height = window.innerHeight / 12
  const width = window.innerWidth / 7
  const shouldFollowCursor =
    cursorState.isPressed &&
    cursorState.pressedIndex === deckIndex &&
    canMove &&
    isActive
  const style = shouldFollowCursor
    ? { y: cursorState.mouseY, x: cursorState.mouseX, z: 99 }
    : {
        y: spring(height + cardPileIndex * height),
        x: spring(width / 1.8 + pileIndex * width),
        z: 1,
      }

  const card = isEmpty
    ? { pileIndex, canMove: true, isEmpty: true }
    : {
        value,
        index,
        deckIndex,
        isActive,
        canMove,
        isCheat,
      }

  return (
    <Motion key={index} style={style}>
      {({ x, y, z }) => (
        <div
          onMouseDown={onMouseDown.bind(null, card, x, y)}
          onMouseUp={onMouseUp.bind(null, card, x, y)}
          onTouchStart={onTouchStart.bind(null, card, x, y)}
          className={`card spades rank${value} ${isCheat ? 'is-cheat' : ''} ${
            isActive ? 'is-active' : ''
          } ${isEmpty ? 'empty' : ''}`}
          style={{
            transform: `translate3d(${x}px, ${y}px, 0)`,
            zIndex: z,
            pointerEvents: shouldFollowCursor ? 'none' : 'all',
          }}
        >
          <div className="face" />
        </div>
      )}
    </Motion>
  )
}
