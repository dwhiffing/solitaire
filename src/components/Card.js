import React from 'react'
import { Motion, spring } from 'react-motion'
import { getCardPosition, getCardSpacing } from '../utils'
const SUITS = ['spades', 'clubs', 'hearts', 'diamonds']

const config = { stiffness: 200, damping: 20 }

export const Card = ({
  card,
  activeCard,
  onRest = () => {},
  mouseX = 0,
  mouseY = 0,
  isPressed,
}) => {
  const { height } = getCardSpacing()
  const { x: xPos, y: yPos } = getCardPosition(card)

  const shouldFollowCursor = card.isActive && isPressed

  const yOffset = shouldFollowCursor
    ? height * Math.abs(activeCard.cardPileIndex - card.cardPileIndex)
    : 0

  const x = shouldFollowCursor ? mouseX : spring(xPos, config)
  const y = shouldFollowCursor ? mouseY + yOffset : spring(yPos, config)
  const r = spring(card.isCheat ? 22 : 0, config)
  const s = spring(card.isActive ? 1.185 : 1, config)
  const zIndex = shouldFollowCursor
    ? 35 + card.cardPileIndex
    : card.cardPileIndex

  return (
    <Motion style={{ x, y, r, s }} onRest={onRest}>
      {({ x, y, r, s }) => (
        <DisplayCard
          card={card}
          style={{
            transform: `translate3d(${x}px, ${y}px, 0) rotate(${r}deg) scale(${s})`,
            zIndex,
          }}
        />
      )}
    </Motion>
  )
}

const DisplayCard = ({ card, style = {} }) => {
  const classes = [
    'card',
    `rank${card.value}`,
    card.isFinished && 'finished',
    card.canMove && 'can-move',
    card.isActive && 'disable-touch',
    card.isEmpty && 'empty',
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
      <div className="back" />
    </div>
  )
}
