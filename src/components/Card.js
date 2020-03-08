import React from 'react'
import { Motion, spring } from 'react-motion'

export const Card = ({
  card,
  onMouseDown,
  onMouseUp,
  onTouchStart,
  cursorState,
}) => {
  const shouldFollowCursor =
    cursorState.isPressed &&
    cursorState.pressedIndex === card.deckIndex &&
    card.canMove &&
    card.isActive

  const height = window.innerHeight / 12
  const width = window.innerWidth / 7

  const style = shouldFollowCursor
    ? { y: cursorState.mouseY, x: cursorState.mouseX, z: 99 }
    : {
        y: spring(height + card.cardPileIndex * height),
        x: spring(width / 1.8 + card.pileIndex * width),
        z: 1,
      }

  return (
    <Motion key={card.index} style={style}>
      {({ x, y, z }) => (
        <div
          onMouseDown={onMouseDown.bind(null, card, x, y)}
          onMouseUp={onMouseUp.bind(null, card, x, y)}
          onTouchStart={onTouchStart.bind(null, card, x, y)}
          className={`card spades rank${card.value} ${
            card.isCheat ? 'is-cheat' : ''
          } ${card.isActive ? 'is-active' : ''} ${card.isEmpty ? 'empty' : ''}`}
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
