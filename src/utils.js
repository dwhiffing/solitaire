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

export const moveCard = (piles, movedCard, destinationPileIndex) =>
  piles.map((pile, pileIndex) => {
    const cardPileIndex = piles.findIndex(pile =>
      pile.find(c => c.index === movedCard.index),
    ) // remove the active movedCard from its pile

    if (pileIndex === cardPileIndex) {
      return pile.slice(0, pile.length - 1)
    } // add the active movedCard to the target pile

    if (pileIndex === destinationPileIndex) {
      return [...pile, movedCard]
    }

    return pile
  })
