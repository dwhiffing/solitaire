import React, { useEffect, useState } from 'react'
import { Motion, spring } from 'react-motion'

const SUITS = ['spades', 'clubs', 'hearts', 'diamonds']

export const Card = ({
  card,
  activeCard,
  onMouseDown,
  onMouseUp,
  cursorState,
}) => {
  const [z, setZ] = useState(1)
  const shouldFollowCursor =
    cursorState.isPressed && card.isActive && card.canMove

  useEffect(() => {
    let timeout = setTimeout(
      () => setZ(shouldFollowCursor ? 99 : 1),
      shouldFollowCursor ? 1 : 500,
    )
    return () => clearTimeout(timeout)
  }, [shouldFollowCursor])

  const height = window.innerHeight / 15
  const width = window.innerWidth / 7
  const style = shouldFollowCursor
    ? {
        y:
          cursorState.mouseY +
          (activeCard
            ? height * Math.abs(activeCard.cardPileIndex - card.cardPileIndex)
            : -30),
        x: cursorState.mouseX,
        z: 99,
      }
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
          className={`card ${SUITS[card.suit]} rank${card.value} ${
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
