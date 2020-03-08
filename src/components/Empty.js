import React from 'react'
import { useDrop } from 'react-dnd'

export const Empty = ({ index: pileIndex, onClick }) => {
  const [, dropRef] = useDrop({
    accept: 'card',
    drop: () => ({ pileIndex, isEmpty: true, canMove: true }),
  })

  return (
    <div style={{ height: 25 }}>
      <div
        ref={dropRef}
        className="card empty"
        onClick={() => onClick({ pileIndex, canMove: true, isEmpty: true })}
      />
    </div>
  )
}
