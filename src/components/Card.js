import React, { useEffect, useState, useRef } from 'react'
import { Motion, spring } from 'react-motion'

const SUITS = ['spades', 'clubs', 'hearts', 'diamonds']

export const Card = ({
  card,
  activeCard,
  onMouseDown,
  onMouseUp,
  cursorState,
}) => {
  const shouldFollowCursor =
    cursorState.isPressed && card.isActive && card.canMove

  const height = window.innerHeight / 18
  const width = window.innerWidth / 6.2
  const yOffset = shouldFollowCursor
    ? height * Math.abs(activeCard.cardPileIndex - card.cardPileIndex)
    : 0
  const r = spring(card.isCheat ? 22 : 0)
  const s = spring(card.isActive ? 1.185 : 1)
  const { mouseX, mouseY } = cursorState
  const xPos = width / 4 + card.pileIndex * width
  const yPos = height * 1.5 + card.cardPileIndex * height

  const x = shouldFollowCursor ? mouseX : spring(xPos)
  const y = shouldFollowCursor ? mouseY + yOffset : spring(yPos)

  return (
    <Motion style={{ x, y, r, s }}>
      {({ x, y, r, s }) => (
        <div
          onPointerDown={onMouseDown.bind(null, card, x, y)}
          onPointerUp={onMouseUp.bind(null, card, x, y)}
          data-index={card.index}
          className={`card ${SUITS[card.suit]} rank${card.value} ${
            shouldFollowCursor ? 'disable-touch' : ''
          }`}
          style={{
            transform: `translate3d(${x}px, ${y}px, 0) rotate(${r}deg) scale(${s})`,
            zIndex: shouldFollowCursor
              ? 35 + card.cardPileIndex
              : card.cardPileIndex,
          }}
        >
          <div className="face" />
          {card.isEmpty && <div className="back" />}
        </div>
      )}
    </Motion>
  )
}
