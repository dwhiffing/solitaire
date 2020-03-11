import React, { useState, useEffect } from 'react'
import {
  shuffleDeck,
  useWindowEvent,
  moveCard,
  getCanCardMove,
  getCardIsActive,
  getCardFromPoint,
  useForceUpdate,
} from './utils'
import { Card } from './components/Card'
import './index.css'
import debounce from 'lodash/debounce'
import uniq from 'lodash/uniq'
import { Header } from './components/Header'

const initialState = { startX: 0, startY: 0, mouseY: 0, mouseX: 0 }

function App() {
  const [activeCard, setActiveCard] = useState(null)
  const [cursorState, setCursorState] = useState(initialState)
  const [cards, setCards] = useState(shuffleDeck())
  const [hasWon, setHasWon] = useState(false)
  useWindowEvent('resize', debounce(useForceUpdate(), 500))

  useEffect(() => {
    const finished = uniq(cards.filter(c => c.isFinished).map(c => c.pileIndex))
    if (finished.length >= 4 && !hasWon) {
      setHasWon(true)
    }
  }, [cards, hasWon])

  const onMouseDown = (card, mouseX, mouseY, e) => {
    const { pageX: startX, pageY: startY } = e
    const { isActive, canMove, isEmpty, index: pressedIndex } = card
    if (activeCard) {
      setCards(moveCard(cards, activeCard, card))
      setActiveCard(null)
    } else if (isActive || !canMove || (!activeCard && isEmpty)) {
      setActiveCard(null)
    } else {
      setActiveCard(card)
    }

    setCursorState({
      topDeltaY: startY - mouseY,
      topDeltaX: startX - mouseX,
      mouseY,
      mouseX,
      startX,
      startY,
      pressedIndex,
    })
  }

  const onMouseMove = ({ pageY, pageX }) => {
    const { pressedIndex, topDeltaX, topDeltaY } = cursorState

    if (typeof pressedIndex === 'number') {
      const mouseY = pageY - topDeltaY
      const mouseX = pageX - topDeltaX

      // TODO show preview of cheat rotation when hovering
      // const card = getCardFromPoint(mouseX, mouseY, cards)
      // if (card) {
      //   console.log(card.value)
      // }

      setCursorState({ ...cursorState, mouseY, mouseX })
    }
  }

  const onMouseUp = e => {
    const diffX = Math.abs(cursorState.startX - e.pageX)
    const diffY = Math.abs(cursorState.startY - e.pageY)
    if (
      activeCard &&
      typeof cursorState.pressedIndex === 'number' &&
      diffX < 10 &&
      diffY < 10
    ) {
    } else {
      setActiveCard(null)
    }

    setCursorState({
      ...cursorState,
      pressedIndex: null,
      topDeltaY: 0,
    })
  }

  const onCardRelease = (clickedCard, x, y, e) => {
    const diffX = Math.abs(cursorState.startX - e.pageX)
    const diffY = Math.abs(cursorState.startY - e.pageY)

    if (
      activeCard &&
      typeof cursorState.pressedIndex === 'number' &&
      (diffX > 10 || diffY > 10)
    ) {
      const clickedCard = getCardFromPoint(e.clientX, e.clientY, cards)

      if (activeCard && clickedCard) {
        setCards(moveCard(cards, activeCard, clickedCard))
      }
    }
  }

  useWindowEvent('pointerup', onMouseUp)
  useWindowEvent('pointermove', onMouseMove)

  return (
    <div className="container">
      <Header
        hasWon={hasWon}
        onReset={() => {
          setCards(shuffleDeck())
          hasWon(false)
        }}
      />

      {[0, 1, 2, 3, 4, 5].map(n => (
        <Card
          key={`pile-${n}`}
          card={{
            cardPileIndex: -1,
            pileIndex: n,
            isEmpty: true,
            canMove: true,
          }}
          onMouseUp={onCardRelease}
          onMouseDown={onMouseDown}
        />
      ))}

      {cards.map((card, cardIndex) => (
        <Card
          key={`card-${cardIndex}`}
          card={{
            ...card,
            isActive: getCardIsActive(activeCard, card),
            canMove: getCanCardMove(card, cards),
          }}
          activeCard={activeCard}
          cursorState={cursorState}
          onMouseUp={onCardRelease}
          onMouseDown={onMouseDown}
        />
      ))}
    </div>
  )
}

export default App
