import React, { useState } from 'react'
import { shuffleDeck, moveCard } from './utils'
import { Card } from './Card'

function App() {
  const [activeCard, setActiveCard] = useState(null)
  const [piles, setPiles] = useState(shuffleDeck())

  const onClickCard = clickedCard => {
    if (!activeCard) {
      return setActiveCard(clickedCard)
    }

    if (clickedCard.index === activeCard.index) {
      return setActiveCard(null)
    }

    const clickedCardPileIndex = piles.findIndex(pile =>
      pile.find(c => c.index === clickedCard.index),
    )

    setPiles(moveCard(piles, activeCard, clickedCardPileIndex))
    setActiveCard(null)
  }

  return (
    <div style={{ display: 'flex' }}>
      {piles.map((pile, pileIndex) => (
        <div
          key={`pile-${pileIndex}`}
          style={{ display: 'flex', margin: 5, flexDirection: 'column' }}
        >
          {pile.map(card => (
            <Card
              key={`card-${card.index}`}
              isActive={activeCard && activeCard.index === card.index}
              onClick={onClickCard}
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
