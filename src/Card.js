import React from 'react'
import { useDrag, useDrop } from 'react-dnd'

export const Card = ({ isActive, value, index, onDrag, onClick }) => {
  const [, dragRef] = useDrag({
    item: { id: index, type: 'card' },
    end: (item, monitor) => {
      console.log(
        'drag',
        item,
        index,
        monitor.didDrop(),
        monitor.getDropResult(),
      )
      if (monitor.didDrop()) {
        const targetCard = monitor.getDropResult()
        onDrag({ value, index }, targetCard)
      }
    },
  })
  const [, dropRef] = useDrop({
    accept: 'card',
    drop: () => ({ index, value }),
  })
  return (
    <div ref={dragRef} style={{ height: 25 }}>
      <div
        onClick={() => onClick({ value, index })}
        style={{
          cursor: 'pointer',
          border: '1px solid black',
          height: 80,
          width: 50,
          borderRadius: 8,
          userSelect: 'none',
          position: 'relative',
          backgroundColor: isActive ? 'tomato' : 'white',
        }}
      >
        <div
          ref={dropRef}
          style={{ position: 'absolute', top: 5, left: 5, right: 5, bottom: 5 }}
        />
        <div style={{ position: 'absolute', top: 5, left: 5 }}>{value}</div>
        <div style={{ position: 'absolute', bottom: 5, right: 5 }}>{index}</div>
      </div>
    </div>
  )
}
