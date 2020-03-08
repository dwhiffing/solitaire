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
        ref={dropRef}
        className="card empty"
        onClick={() =>
          onClick({ pileIndex: index, canMove: true, isEmpty: true })
        }
      >
        {/* <div className="back" /> */}
      </div>
    </div>
  )
}
