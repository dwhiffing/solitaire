import React, { useState, useEffect } from 'react'
import {
  shuffleDeck,
  useWindowEvent,
  moveCard,
  getCanCardMove,
  getCardIsActive,
  getCardFromPoint,
  useForceUpdate,
  getBottomCard,
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

  const onMouseDown = e => {
    const { pageX: startX, pageY: startY } = e
    let card = getCardFromPoint(e.clientX, e.clientY, cards)
    const { isActive, canMove, isEmpty, index: pressedIndex } = card

    if (activeCard && card) {
      const bottomCard = getBottomCard(card, cards)
      setCards(moveCard(cards, activeCard, bottomCard))
      setActiveCard(null)
    } else if (isActive || !canMove || (!activeCard && isEmpty)) {
      setActiveCard(null)
    } else {
      setActiveCard(card)
    }

    setCursorState({
      ...cursorState,
      mouseX: card.x,
      mouseY: card.y,
      topDeltaX: startX - card.x,
      topDeltaY: startY - card.y,
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

      setCursorState({ ...cursorState, mouseY, mouseX })
    }
  }

  const onMouseUp = e => {
    const diffX = Math.abs(cursorState.startX - e.pageX)
    const diffY = Math.abs(cursorState.startY - e.pageY)
    const passedThreshold = diffX > 10 || diffY > 10

    if (activeCard && passedThreshold) {
      let clickedCard = getCardFromPoint(e.clientX, e.clientY, cards, true)

      clickedCard = getBottomCard(clickedCard, cards)

      if (activeCard && clickedCard) {
        setCards(moveCard(cards, activeCard, clickedCard))
      }
      setActiveCard(null)
    }

    setCursorState({
      ...cursorState,
      pressedIndex: null,
      topDeltaY: 0,
    })
  }

  useWindowEvent('pointerup', onMouseUp)
  useWindowEvent('pointerdown', onMouseDown)
  useWindowEvent('pointermove', onMouseMove)

  return (
    <div className="container">
      <Header
        hasWon={hasWon}
        onReset={() => {
          setCards(shuffleDeck())
          setHasWon(false)
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
          mouseX={cursorState.mouseX}
          mouseY={cursorState.mouseY}
        />
      ))}
    </div>
  )
}

export default App
