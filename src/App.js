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

  useEffect(() => {
    const finished = uniq(cards.filter(c => c.isFinished).map(c => c.pileIndex))
    if (finished.length >= 4 && !hasWon) {
      setHasWon(true)
    }
  }, [cards, hasWon])

  const onMouseDown = e => {
    const { pageX: startX, pageY: startY } = e

    let card = getCardFromPoint(e.clientX, e.clientY, cards)
    if (!card) {
      return setActiveCard(null)
    }

    if (activeCard) {
      const bottomCard = getBottomCard(card, cards)
      setCards(moveCard(cards, activeCard, bottomCard))
      setActiveCard(null)
    } else if (!card.isActive && card.canMove) {
      setActiveCard(card)
    }

    const mouseY = card.y
    const mouseX = card.x
    const deltaY = startY - card.y
    const deltaX = startX - card.x
    setCursorState({ mouseX, mouseY, deltaX, deltaY, startX, startY })
  }

  const onMouseMove = ({ pageY, pageX }) => {
    const { deltaX, deltaY } = cursorState

    const mouseY = pageY - deltaY
    const mouseX = pageX - deltaX

    setCursorState({ ...cursorState, mouseY, mouseX })
  }

  const onMouseUp = e => {
    const diffX = Math.abs(cursorState.startX - e.pageX)
    const diffY = Math.abs(cursorState.startY - e.pageY)
    const passedThreshold = diffX > 20 || diffY > 20

    if (activeCard) {
      let clickedCard = getCardFromPoint(e.clientX, e.clientY, cards, true)
      clickedCard = getBottomCard(clickedCard, cards)
      if (clickedCard) {
        setCards(moveCard(cards, activeCard, clickedCard))
      }
      if (passedThreshold) {
        setActiveCard(null)
      }
    }
  }

  useWindowEvent('resize', debounce(useForceUpdate(), 500))
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
