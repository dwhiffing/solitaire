import React, { useState } from 'react'
import { shuffleDeck, moveCard, isDescending } from './utils'
import { Card } from './Card'

function App() {
  const [activeCard, setActiveCard] = useState(null)
  const [piles, setPiles] = useState(shuffleDeck())

  const onDragCard = (sourceCard, destinationCard) => {
    if (sourceCard && destinationCard) {
      setPiles(moveCard(piles, sourceCard, destinationCard))
    }
  }

  const onClickCard = clickedCard => {
    if (!clickedCard.isValid) {
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
    <div style={{ display: 'flex' }}>
      {piles.map((pile, pileIndex) => (
        <div
          key={`pile-${pileIndex}`}
          style={{ display: 'flex', margin: 5, flexDirection: 'column' }}
        >
          {pile.map((card, cardPileIndex) => (
            <Card
              key={`card-${card.index}`}
              isActive={activeCard && activeCard.index === card.index}
              isValid={isDescending([
                ...pile.map(c => c.value).slice(cardPileIndex, pile.length),
              ])}
              onClick={onClickCard}
              onDrag={onDragCard}
              value={card.value}
              index={card.index}
            />
          ))}
        </div>
      ))}
    </div>
  )
}

export default App
