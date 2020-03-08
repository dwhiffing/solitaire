import React from 'react'

export const Empty = ({ index: pileIndex, onClick }) => {
  return (
    <div style={{ height: 25 }}>
      <div
        className="card empty"
        onClick={() => onClick({ pileIndex, canMove: true, isEmpty: true })}
      />
    </div>
  )
}
