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
    <div ref={dragRef} style={{ height: 25 }}>
      <div
        onClick={() => onClick({ value, index, isCheat, canMove })}
        style={{
          cursor: 'pointer',
          border: '1px solid black',
          height: 80,
          width: 50,
          borderRadius: 8,
          overflow: 'hidden',
          userSelect: 'none',
          position: 'relative',
          backgroundColor: 'white',
        }}
      >
        <div
          ref={dropRef}
          style={{
            position: 'absolute',
            top: -5,
            left: -5,
            right: -5,
            bottom: -5,
          }}
        />
        {isCheat && (
          <div
            style={{
              position: 'absolute',
              backgroundColor: 'tomato',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
            }}
          />
        )}
        {isActive && (
          <div
            style={{
              position: 'absolute',
              backgroundColor: 'khaki',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
            }}
          />
        )}
        <div style={{ position: 'absolute', top: 5, left: 5 }}>{value}</div>
        <div style={{ position: 'absolute', bottom: 5, right: 5 }}>{value}</div>
      </div>
    </div>
  )
}
