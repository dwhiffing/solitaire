import React, { useEffect, useRef } from 'react'
import { useTimer } from '../utils'
export function Header({ onReset, hasWon }) {
  const winRef = useRef(false)
  const timer = useTimer()

  useEffect(() => {
    if (hasWon && !winRef.current) {
      winRef.current = true
      alert(
        `You win! Your final time was ${timer.minutes} minutes, ${timer.seconds} seconds`,
      )
      timer.reset()
      onReset()
      winRef.current = false
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
