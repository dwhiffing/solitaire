import React from 'react'
import { Motion, spring } from 'react-motion'
import { getCardPosition, getCardSpacing } from '../utils'
const SUITS = ['spades', 'clubs', 'hearts', 'diamonds']

export const Card = ({
  card,
  activeCard,
  onRest = () => {},
  mouseX = 0,
  mouseY = 0,
}) => {
  const { height } = getCardSpacing()
  const { x: xPos, y: yPos } = getCardPosition(card)

  const shouldFollowCursor = card.isActive && card.canMove
  const yOffset = shouldFollowCursor
    ? height * Math.abs(activeCard.cardPileIndex - card.cardPileIndex)
    : 0

  const x = shouldFollowCursor ? mouseX : spring(xPos)
  const y = shouldFollowCursor ? mouseY + yOffset : spring(yPos)
  const r = spring(card.isCheat ? 22 : 0)
  const s = spring(card.isActive ? 1.185 : 1)
  const zIndex = shouldFollowCursor
    ? 35 + card.cardPileIndex
    : card.cardPileIndex

  const classes = [
    'card',
    card.isFinished ? 'is-finished' : `rank${card.value}`,
    SUITS[card.suit],
    card.canMove && 'can-move',
    shouldFollowCursor && 'disable-touch',
    card.isEmpty && 'empty',
  ]

  return (
    <Motion style={{ x, y, r, s }} onRest={onRest}>
      {({ x, y, r, s }) => (
        <DisplayCard
          card={card}
          classNames={classes}
          style={{
            transform: `translate3d(${x}px, ${y}px, 0) rotate(${r}deg) scale(${s})`,
            zIndex,
          }}
        />
      )}
    </Motion>
  )
}

const DisplayCard = ({ card, classNames = [], style = {} }) => {
  const classes = [
    'card',
    ...classNames,
    card.isFinished ? 'is-finished' : `rank${card.value}`,
    SUITS[card.suit],
  ]

  return (
    <div
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
