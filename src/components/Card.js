import React from 'react'
import { Motion, spring } from 'react-motion'

export const Card = ({ card, onMouseDown, onMouseUp, cursorState }) => {
  const shouldFollowCursor =
    cursorState.isPressed &&
    cursorState.pressedIndex === card.deckIndex &&
    card.canMove &&
    card.isActive

  const height = window.innerHeight / 15
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
          onPointerDown={onMouseDown.bind(null, card, x, y)}
          onPointerUp={onMouseUp.bind(null, card, x, y)}
          data-index={card.deckIndex}
          className={`card spades rank${card.value} ${
            card.isCheat ? 'is-cheat' : ''
          } ${card.isActive ? 'is-active' : ''} ${
            card.isEmpty ? 'empty' : ''
          } ${shouldFollowCursor ? 'disable-touch' : ''}`}
          style={{
            transform: `translate3d(${x}px, ${y}px, 0)`,
            zIndex: z,
          }}
        >
          <div className="face" />
        </div>
      )}
    </Motion>
  )
}
