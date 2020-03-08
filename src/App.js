import React, { useState } from 'react'
import { shuffleDeck, moveCard, isDescending } from './utils'
import { Card } from './components/Card'
import { Empty } from './components/Empty'
import './index.css'

function App() {
  const [activeCard, setActiveCard] = useState(null)
  const [piles, setPiles] = useState([...shuffleDeck()])

  const onDragCard = (sourceCard, destinationCard) => {
    if (
      sourceCard &&
      destinationCard &&
      sourceCard.index !== destinationCard.index
    ) {
      setPiles(moveCard(piles, sourceCard, destinationCard))
    }
  }

  const onClickCard = clickedCard => {
    if (!clickedCard.canMove || (activeCard && clickedCard.isEmpty)) {
      return
    }

    if (!activeCard) {
      return setActiveCard(clickedCard)
    }

    if (clickedCard.index === activeCard.index) {
      return setActiveCard(null)
    }

    setPiles(moveCard(piles, activeCard, clickedCard))
    setActiveCard(null)
  }

  return (
    <div style={{ margin: '0 auto', display: 'flex' }}>
      {piles.map((pile, pileIndex) => {
        return (
          <div
            key={`pile-${pileIndex}`}
            style={{ display: 'flex', margin: 5, flexDirection: 'column' }}
          >
            {pile.length === 0 ? (
              <Empty index={pileIndex} onClick={onClickCard} />
            ) : (
              pile.map((card, cardPileIndex) => (
                <Card
                  key={`card-${card.index}`}
                  isActive={getCardIsActive(activeCard, card, piles)}
                  canMove={isDescending([
                    ...pile.map(c => c.value).slice(cardPileIndex, pile.length),
                  ])}
                  onClick={onClickCard}
                  onDrag={onDragCard}
                  value={card.value}
                  index={card.index}
                  isCheat={card.isCheat}
                />
              ))
            )}
          </div>
        )
      })}
    </div>
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
