import shuffle from 'lodash/shuffle'
import chunk from 'lodash/chunk'
import { useEffect } from 'react'

const CARDS = '987654321'
  .split('')
  .map(n => Number(n))
  .map(n => [
    { value: n, suit: 0 },
    { value: n, suit: 1 },
    { value: n, suit: 2 },
    { value: n, suit: 3 },
  ])
  .flat()

export const shuffleDeck = () =>
  chunk(shuffle(CARDS), 6)
    .map((pile, pileIndex) =>
      pile.map((n, i) => ({
        ...n,
        cardPileIndex: i,
        pileIndex,
      })),
    )
    .flat()
    .map((c, i) => ({ ...c, index: i }))

export const isDescending = numbers => {
  return (
    numbers.filter((number, index) => {
      return numbers[index + 1] ? number === numbers[index + 1] + 1 : true
    }).length === numbers.length
  )
}

export const moveCard = (cards, movedCard, destinationCard) => {
  const sourcePile = getCardPile(movedCard, cards)
  const numToMove = sourcePile.length - movedCard.cardPileIndex
  const allowCheat =
    numToMove === 1 && !movedCard.isCheat && !destinationCard.isCheat
  const isCheat =
    movedCard.value !== destinationCard.value - 1 && !destinationCard.isEmpty

  const movingCards = sourcePile.slice(
    movedCard.cardPileIndex,
    movedCard.cardPileIndex + numToMove,
  )

  const validOrder =
    destinationCard.isEmpty ||
    (!destinationCard.isCheat &&
      isDescending([destinationCard.value, ...movingCards.map(m => m.value)]))

  return cards.map(card => {
    if (
      card.pileIndex !== movedCard.pileIndex ||
      movedCard.pileIndex === destinationCard.pileIndex
    ) {
      return card
    }

    if (!movingCards.map(c => c.index).includes(card.index)) {
      return card
    }

    if (
      (validOrder || allowCheat) &&
      !Number.isNaN(destinationCard.pileIndex)
    ) {
      const cardPileIndex =
        destinationCard.cardPileIndex +
        movingCards.findIndex(c => c.index === card.index) +
        1

      return {
        ...card,
        pileIndex: destinationCard.pileIndex,
        cardPileIndex,
        isCheat,
      }
    }

    return card
  })
}

export function getCardIsActive(activeCard, card) {
  let isActive = false

  if (activeCard) {
    isActive =
      activeCard.pileIndex === card.pileIndex &&
      activeCard.cardPileIndex <= card.cardPileIndex
  }

  return isActive
}

export const getCardPile = (card, cards) => {
  const pile = cards.filter(c => c.pileIndex === card.pileIndex)
  return pile.sort((a, b) => a.cardPileIndex - b.cardPileIndex)
}

export const getCanCardMove = (card, cards) => {
  const pile = getCardPile(card, cards)
  const bottom = pile.map(c => c.value).slice(card.cardPileIndex, pile.length)
  return isDescending(bottom)
}

export const useWindowEvent = (event, callback) => {
  useEffect(() => {
    window.addEventListener(event, callback)
    return () => window.removeEventListener(event, callback)
  }, [event, callback])
}

export const getCardFromPoint = (x, y, cards) => {
  let card
  const elementUnder = document.elementFromPoint(x, y)

  if (elementUnder && elementUnder.parentElement) {
    const dataIndex = elementUnder.parentElement.dataset.index

    if (dataIndex) {
      card = cards[+dataIndex]
    } else {
      let emptyCard = {
        cardPileIndex: -1,
        pileIndex: +elementUnder.parentElement.dataset.pileindex,
        isEmpty: true,
        canMove: true,
      }
      const pile = getCardPile(emptyCard, cards)

      if (pile.length === 0) {
        card = { ...emptyCard }
      }
    }
  }

  if (card && !card.isEmpty) {
    const pile = getCardPile(card, cards)
    card = pile[pile.length - 1]
  }

  return card
}
