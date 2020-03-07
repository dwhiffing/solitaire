import shuffle from 'lodash/shuffle'
import chunk from 'lodash/chunk'

const CARDS = '987654321'
  .split('')
  .map(n => Number(n))
  .map(n => [n, n, n, n])
  .flat()

export const shuffleDeck = () =>
  chunk(
    shuffle(CARDS).map((n, i) => ({
      value: n,
      index: i,
    })),
    6,
  )

export const isDescending = numbers => {
  return (
    numbers.filter((number, index) => {
      return numbers[index + 1] ? number === numbers[index + 1] + 1 : true
    }).length === numbers.length
  )
}

export const moveCard = (piles, movedCard, destinationCard) => {
  const destinationPileIndex = piles.findIndex(pile =>
    pile.find(c => c.index === destinationCard.index),
  )

  return piles.map((targetPile, targetPileIndex) => {
    const cardPileIndex = piles.findIndex(pile =>
      pile.find(c => c.index === movedCard.index),
    )
    const sourcePile = piles[cardPileIndex]
    const indexInPile = sourcePile.findIndex(
      card => card.index === movedCard.index,
    )
    const numToMove = sourcePile.length - indexInPile

    const movingCards = sourcePile.slice(indexInPile, indexInPile + numToMove)
    if (
      isDescending([destinationCard.value, ...movingCards.map(m => m.value)])
    ) {
      // remove the active movedCard from its pile
      if (targetPileIndex === cardPileIndex) {
        return targetPile.slice(0, targetPile.length - numToMove)
      }

      // add the active movedCard to the target pile
      if (targetPileIndex === destinationPileIndex) {
        return [...targetPile, ...movingCards]
      }
    }

    return targetPile
  })
}
