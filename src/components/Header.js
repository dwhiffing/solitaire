import React, { useEffect } from 'react'
import { useTimer } from '../utils'
export function Header({ onReset, hasWon }) {
  const timer = useTimer()
  useEffect(() => {
    if (hasWon) {
      setTimeout(() => {
        alert(
          `You win! Your final time was ${timer.minutes} minutes, ${timer.seconds} seconds`,
        )
        timer.reset()
        onReset()
      }, 1000)
    }
  }, [hasWon, onReset, timer])
  return (
    <>
      <div style={{ width: 80 }}>
        <span>Solitaire</span>
      </div>

      <div style={{ width: 80, textAlign: 'center' }}>
        <span>
          {`${timer.minutes.toString().padStart(2, '0') +
            ':'}${timer.seconds.toString().padStart(2, '0')}`}
        </span>
      </div>

      <div style={{ width: 80, textAlign: 'center' }}>
        <span
          onClick={() => {
            const yes = window.confirm('Start a new game?')
            if (yes) {
              onReset()
              timer.reset()
            }
          }}
        >
          +
        </span>
      </div>
    </>
  )
}
