import React, { useState, useEffect } from 'react'
import { shuffleDeck, moveCard, isDescending } from './utils'
import { Card } from './components/Card'
import './index.css'

const useWindowEvent = (event, callback) => {
  useEffect(() => {
    window.addEventListener(event, callback)
    return () => window.removeEventListener(event, callback)
  }, [event, callback])
}

function App() {
  const [activeCard, setActiveCard] = useState(null)
  const [cursorState, setCursorState] = useState({
    startX: 0,
    startY: 0,
    mouseY: 0,
    mouseX: 0,
  })
  const [piles, setPiles] = useState([...shuffleDeck()])

  const deck = piles.flat()

  const onMouseDown = (card, pressX, pressY, e) => {
    const { pageX, pageY } = e
    if (activeCard) {
      setPiles(moveCard(piles, activeCard, card))
      setActiveCard(null)
    } else if (!card.canMove || (!activeCard && card.isEmpty)) {
      setActiveCard(null)
    } else if (card.isActive) {
      setActiveCard(null)
    } else {
      setActiveCard(card)
    }
    setCursorState({
      topDeltaY: pageY - pressY,
      topDeltaX: pageX - pressX,
      mouseY: pressY,
      mouseX: pressX,
      startX: pageX,
      startY: pageY,
      isPressed: true,
      pressedIndex: card.deckIndex,
    })
  }

  const onTouchStart = (card, x, y, e) => {
    onMouseDown(card, x, y, e.touches[0])
  }

  const onMouseMove = ({ pageY, pageX }) => {
    const { isPressed, topDeltaY, topDeltaX } = cursorState

    if (isPressed) {
      const mouseY = pageY - topDeltaY
      const mouseX = pageX - topDeltaX

      setCursorState({ ...cursorState, mouseY, mouseX })
    }
  }

  const onTouchMove = e => {
    e.preventDefault()
    onMouseMove(e.touches[0])
  }

  const onCardMouseUp = (clickedCard, x, y, e) => {
    if (activeCard && clickedCard) {
      setPiles(moveCard(piles, activeCard, clickedCard))
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

  useWindowEvent('mouseup', onMouseUp)
  useWindowEvent('touchmove', onTouchMove)
  useWindowEvent('touchend', onMouseUp)
  useWindowEvent('mousemove', onMouseMove)

  return piles.map((pile, pileIndex) =>
    pile.length === 0 ? (
      <Card
        key={`pile-${pileIndex}`}
        pileIndex={pileIndex}
        cardPileIndex={0}
        isEmpty
        onMouseUp={onCardMouseUp}
        cursorState={cursorState}
        onTouchStart={onTouchStart}
        onMouseDown={onMouseDown}
      />
    ) : (
      pile.map((card, cardPileIndex) => (
        <Card
          key={`card-${card.index}`}
          isActive={getCardIsActive(activeCard, card, piles)}
          height={`${1.5 * (8 / Math.max(pile.length, 8))}rem`}
          cursorState={cursorState}
          canMove={getCanCardMove(card, piles)}
          onMouseUp={onCardMouseUp}
          onMouseDown={onMouseDown}
          onTouchStart={onTouchStart}
          value={card.value}
          deckIndex={deck.findIndex(c => c.index === card.index)}
          index={card.index}
          cardPileIndex={cardPileIndex}
          pileIndex={pileIndex}
          isCheat={card.isCheat}
        />
      ))
    ),
  )
}

export default App

function getCardIsActive(activeCard, card, piles) {
  let isActive = false
  if (activeCard) {
    const { index } = activeCard
    isActive = index === card.index
    const activePile = piles.find(pile => pile.find(c => c.index === index))
    const activeIndexInPile = activePile.findIndex(c => c.index === index)
    const indexInPile = activePile.findIndex(c => c.index === card.index)
    isActive = activeIndexInPile <= indexInPile
  }
  return isActive
}

const getCanCardMove = (card, piles) => {
  const pileIndex = piles.findIndex(pile =>
    pile.find(c => c.index === card.index),
  )
  const pile = piles[pileIndex]
  const cardPileIndex = pile.findIndex(c => c.index === card.index)
  return isDescending([
    ...pile.map(c => c.value).slice(cardPileIndex, pile.length),
  ])
}
