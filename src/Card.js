import React from 'react'
export const Card = ({ isActive, value, index, onClick }) => (
  <div style={{ height: 25 }}>
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
      <div style={{ position: 'absolute', top: 5, left: 5 }}>{value}</div>
      <div style={{ position: 'absolute', bottom: 5, right: 5 }}>{index}</div>
    </div>
  </div>
)
