import React from 'react'
import { useDrop } from 'react-dnd'

export const Empty = ({ index, onClick }) => {
  const [, dropRef] = useDrop({
    accept: 'card',
    drop: () => ({ pileIndex: index, isEmpty: true, canMove: true }),
  })
  return (
    <div style={{ height: 25 }}>
      <div
        onClick={() =>
          onClick({ pileIndex: index, canMove: true, isEmpty: true })
        }
        style={{
          cursor: 'pointer',
          border: '1px solid black',
          height: 80,
          width: 50,
          borderRadius: 8,
          userSelect: 'none',
          position: 'relative',
          backgroundColor: 'gray',
        }}
      >
        <div
          ref={dropRef}
          style={{ position: 'absolute', top: 5, left: 5, right: 5, bottom: 5 }}
        />
      </div>
    </div>
  )
}
