import React, { useState } from 'react'
import {
  shuffleDeck,
  useWindowEvent,
  moveCard,
  getCanCardMove,
  getCardIsActive,
} from './utils'
import { Card } from './components/Card'
import './index.css'

const initialState = { startX: 0, startY: 0, mouseY: 0, mouseX: 0 }

function App() {
  const [activeCard, setActiveCard] = useState(null)
  const [cursorState, setCursorState] = useState(initialState)
  const [piles, setPiles] = useState([...shuffleDeck()])

  const deck = piles.flat()

  const onMouseDown = (card, mouseX, mouseY, e) => {
    const { pageX: startX, pageY: startY } = e
    if (activeCard) {
      setPiles(moveCard(piles, activeCard, card))
      setActiveCard(null)
    } else if (
      card.isActive ||
      !card.canMove ||
      (!activeCard && card.isEmpty)
    ) {
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
      isPressed: true,
      pressedIndex: card.deckIndex,
    })
  }

  const onMouseMove = ({ pageY, pageX }) => {
    const { isPressed, topDeltaY, topDeltaX } = cursorState

    if (isPressed) {
      const mouseY = pageY - topDeltaY
      const mouseX = pageX - topDeltaX

      setCursorState({ ...cursorState, mouseY, mouseX })
    }
  }

  const onMouseUp = e => {
    const diffX = Math.abs(cursorState.startX - e.pageX)
    const diffY = Math.abs(cursorState.startY - e.pageY)

    if (activeCard && cursorState.pressedIndex && diffX < 10 && diffY < 10) {
    } else {
      setActiveCard(null)
    }

    setCursorState({
      ...cursorState,
      isPressed: false,
      pressedIndex: null,
      topDeltaY: 0,
    })
  }

  const onCardRelease = (clickedCard, x, y, e) => {
    const elementUnder = document.elementFromPoint(e.clientX, e.clientY)
    if (elementUnder && elementUnder.parentElement) {
      const eventCardIndex = +elementUnder.parentElement.dataset.index
      clickedCard = deck[eventCardIndex]
    }

    if (activeCard && clickedCard) {
      setPiles(moveCard(piles, activeCard, clickedCard))
    }
  }

  useWindowEvent('pointerup', onMouseUp)
  useWindowEvent('pointermove', onMouseMove)

  return piles.map((pile, pileIndex) =>
    pile.length === 0 ? (
      <Card
        key={`pile-${pileIndex}`}
        card={{ cardPileIndex: 0, pileIndex, isEmpty: true, canMove: true }}
        onMouseUp={onCardRelease}
        cursorState={cursorState}
        onMouseDown={onMouseDown}
      />
    ) : (
      pile.map((card, cardPileIndex) => (
        <Card
          key={`card-${card.index}`}
          card={{
            ...card,
            isActive: getCardIsActive(activeCard, card, piles),
            canMove: getCanCardMove(card, piles),
            deckIndex: deck.findIndex(c => c.index === card.index),
            pileIndex,
            cardPileIndex,
          }}
          cursorState={cursorState}
          onMouseUp={onCardRelease}
          onMouseDown={onMouseDown}
        />
      ))
    ),
  )
}

export default App
