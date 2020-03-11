import React from 'react'
import { Motion, spring } from 'react-motion'

const SUITS = ['spades', 'clubs', 'hearts', 'diamonds']

export const Card = ({
  card,
  activeCard,
  onMouseDown = () => {},
  onMouseUp = () => {},
  cursorState = { mouseX: 0, mouseY: 0, pressedIndex: null },
}) => {
  const shouldFollowCursor =
    typeof cursorState.pressedIndex === 'number' &&
    card.isActive &&
    card.canMove

  let height = Math.min(38, Math.max(window.innerHeight / 16, 25))
  let yBuffer = height * 2
  if (window.innerWidth > 1000) {
    height = Math.min(50, Math.max(window.innerHeight / 16, 25))
    yBuffer = height * 3
  }

  const width = window.innerWidth / 6.2
  const yOffset = shouldFollowCursor
    ? height * Math.abs(activeCard.cardPileIndex - card.cardPileIndex)
    : 0
  const r = spring(card.isCheat ? 22 : 0)
  const s = spring(card.isActive ? 1.185 : 1)
  const { mouseX, mouseY } = cursorState
  const xPos = width / 4 + card.pileIndex * width
  const yPos = card.isEmpty
    ? yBuffer
    : yBuffer + (card.isFinished ? 0 : card.cardPileIndex * height)

  const x = shouldFollowCursor ? mouseX : spring(xPos)
  const y = shouldFollowCursor ? mouseY + yOffset : spring(yPos)
  const classes = [
    'card',
    card.isFinished ? 'is-finished' : `rank${card.value}`,
    SUITS[card.suit],
    shouldFollowCursor && 'disable-touch',
    card.isEmpty && 'empty',
  ]

  return (
    <Motion style={{ x, y, r, s }}>
      {({ x, y, r, s }) => (
        <DisplayCard
          card={card}
          classNames={classes}
          onPointerDown={
            card.isFinished ? null : onMouseDown.bind(null, card, x, y)
          }
          onPointerUp={
            card.isFinished ? null : onMouseUp.bind(null, card, x, y)
          }
          style={{
            transform: `translate3d(${x}px, ${y}px, 0) rotate(${r}deg) scale(${s})`,
            zIndex: shouldFollowCursor
              ? 35 + card.cardPileIndex
              : card.cardPileIndex,
          }}
        />
      )}
    </Motion>
  )
}

const DisplayCard = ({
  card,
  classNames = [],
  style = {},
  onPointerDown,
  onPointerUp,
}) => {
  const classes = [
    'card',
    ...classNames,
    card.isFinished ? 'is-finished' : `rank${card.value}`,
    SUITS[card.suit],
  ]

  return (
    <div
      onPointerDown={onPointerDown}
      onPointerUp={onPointerUp}
      data-index={card.index}
      data-pileindex={card.pileIndex}
      className={classes.join(' ')}
      style={style}
    >
      <div className="face" />
      {card.isFinished && <div className="back" />}
    </div>
  )
}
