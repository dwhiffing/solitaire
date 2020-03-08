import React from 'react'
import { useDrag, useDrop } from 'react-dnd'

export const Card = ({
  isActive,
  isCheat,
  canMove,
  value,
  index,
  onDrag,
  onClick,
}) => {
  const [, dragRef] = useDrag({
    item: { id: index, type: 'card' },
    end: (item, monitor) => {
      if (monitor.didDrop()) {
        const targetCard = monitor.getDropResult()
        onDrag({ value, index, isCheat }, targetCard)
      }
    },
  })
  const [, dropRef] = useDrop({
    accept: 'card',
    drop: () => ({ index, value, isCheat }),
  })
  return (
    <div className="card-container" ref={dragRef}>
      <div
        className={`card spades rank${value} ${isCheat ? 'is-cheat' : ''} ${
          isActive ? 'is-active' : ''
        }`}
        onClick={() => onClick({ value, index, isCheat, canMove })}
        style={{ position: 'relative' }}
      >
        <div className="face" />
        <div
          ref={dropRef}
          style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
        />
      </div>
    </div>
  )
}
