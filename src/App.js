import React, { useState } from 'react'
import { shuffleDeck, moveCard, isDescending } from './utils'
import { Card } from './Card'
import { Empty } from './Empty'
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
    if (!clickedCard.canMove) {
      return
    }

    if (!activeCard) {
      if (!clickedCard.isEmpty) {
        setActiveCard(clickedCard)
      }
      return
    }

    if (clickedCard.index === activeCard.index) {
      return setActiveCard(null)
    }

    setPiles(moveCard(piles, activeCard, clickedCard))
    setActiveCard(null)
  }

  return (
    <div style={{ display: 'flex' }}>
      {piles.map((pile, pileIndex) => {
        return (
          <div
            key={`pile-${pileIndex}`}
            style={{ display: 'flex', margin: 5, flexDirection: 'column' }}
          >
            {pile.length === 0 ? (
              <Empty index={pileIndex} onClick={onClickCard} />
            ) : (
              pile.map((card, cardPileIndex) => {
                let isActive = false
                if (activeCard) {
                  isActive = activeCard.index === card.index
                  const activePile =
                    activeCard &&
                    piles.find(pile =>
                      pile.find(c => c.index === activeCard.index),
                    )

                  if (activePile) {
                    const activeIndexInPile = activePile.findIndex(
                      c => c.index === activeCard.index,
                    )
                    const indexInPile = activePile.findIndex(
                      c => c.index === card.index,
                    )
                    isActive = activeIndexInPile <= indexInPile
                  }
                }

                return (
                  <Card
                    key={`card-${card.index}`}
                    isActive={isActive}
                    canMove={isDescending([
                      ...pile
                        .map(c => c.value)
                        .slice(cardPileIndex, pile.length),
                    ])}
                    onClick={onClickCard}
                    onDrag={onDragCard}
                    value={card.value}
                    index={card.index}
                    isCheat={card.isCheat}
                  />
                )
              })
            )}
          </div>
        )
      })}
    </div>
  )
}

export default App
