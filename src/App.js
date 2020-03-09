import React, { useState } from 'react'
import {
  shuffleDeck,
  useWindowEvent,
  moveCard,
  getCanCardMove,
  getCardIsActive,
  getCardFromPoint,
} from './utils'
import { Card } from './components/Card'
import './index.css'

const initialState = { startX: 0, startY: 0, mouseY: 0, mouseX: 0 }

function App() {
  const [activeCard, setActiveCard] = useState(null)
  const [cursorState, setCursorState] = useState(initialState)
  const [cards, setCards] = useState([...shuffleDeck()])

  const onMouseDown = (card, mouseX, mouseY, e) => {
    const { pageX: startX, pageY: startY } = e
    if (activeCard) {
      setCards(moveCard(cards, activeCard, card))
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
      pressedIndex: card.index,
    })
  }

  const onMouseMove = ({ pageY, pageX }) => {
    const { isPressed, topDeltaY, topDeltaX } = cursorState

    if (isPressed) {
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
      isPressed: false,
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
    <div>
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
          cursorState={cursorState}
          onMouseDown={onMouseDown}
        />
      ))}

      {cards.map((card, cardIndex) => (
        <Card
          key={`card-${cardIndex}`}
          card={{
            ...card,
            isCheat: !!card.isCheat,
            isActive: getCardIsActive(activeCard, card),
            canMove: getCanCardMove(card, cards),
            pileIndex: card.pileIndex,
            cardPileIndex: card.cardPileIndex,
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
