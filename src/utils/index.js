import shuffle from 'lodash/shuffle'
import chunk from 'lodash/chunk'
import { useEffect, useState, useRef } from 'react'
import groupBy from 'lodash/groupBy'

const VALUES = '987654321'

const CARDS = VALUES.split('')
  .map(n => [
    { value: Number(n), suit: 0 },
    { value: Number(n), suit: 1 },
    { value: Number(n), suit: 2 },
    { value: Number(n), suit: 3 },
  ])
  .flat()

export const SORTED_CARDS = VALUES.split('')
  .map(n => ({ value: Number(n), suit: 0 }))
  .concat(VALUES.split('').map(n => ({ value: Number(n), suit: 1 })))

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
  if (movedCard.isFinished || !destinationCard || destinationCard.isFinished) {
    return cards
  }

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

export const checkForFinishedPiles = cards => {
  const piles = Object.values(
    groupBy(cards, card => card.pileIndex),
  ).map(pile => pile.sort((a, b) => a.cardPileIndex - b.cardPileIndex))

  return piles
    .map(pile => ({
      pile: pile.map(card => card.value).join(''),
      index: pile[0].pileIndex,
    }))
    .filter(({ pile }) => pile === '987654321')
    .map(pile => pile.index)
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

export const getBottomCard = (card, cards) => {
  if (!card) {
    return null
  }

  if (card.isEmpty) {
    return card
  }

  const pile = getCardPile(card, cards)
  card = pile[pile.length - 1]
  return decorateCard(card, cards)
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

export const useDocumentEvent = (event, callback) => {
  useEffect(() => {
    document.addEventListener(event, callback)
    return () => document.removeEventListener(event, callback)
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
      }
      const pile = getCardPile(emptyCard, cards)

      if (pile.length === 0) {
        return { ...emptyCard, ...getCardPosition(emptyCard) }
      }
    }
  }

  return decorateCard(card, cards)
}

const decorateCard = (card, cards) =>
  card
    ? {
        ...card,
        ...getCardPosition(card),
        canMove: getCanCardMove(card, cards),
        isActive: getCardIsActive(card, cards),
      }
    : null

export const useForceUpdate = () => {
  const [, setValue] = useState(0)
  return () => setValue(value => ++value)
}

export const useTimer = () => {
  const timeStopped = useRef(Date.now())
  const intervalRef = useRef()
  const [state, setState] = useState({
    startTime: Date.now(),
    timeGone: 0,
    difference: 0,
  })

  const startTimer = () => {
    setState(state => ({
      ...state,
      timeGone: state.timeGone + (Date.now() - timeStopped.current),
    }))

    intervalRef.current = setInterval(() => {
      setState(state => ({
        ...state,
        difference: Date.now() - state.startTime - state.timeGone,
      }))
    }, 100)
  }

  const stopTimer = () => {
    timeStopped.current = Date.now()
    clearInterval(intervalRef.current)
  }

  useEffect(() => {
    startTimer()
    return stopTimer
  }, [])

  useDocumentEvent('visibilitychange', () =>
    document.hidden ? stopTimer() : startTimer(),
  )

  return {
    minutes: Math.floor((state.difference / 1000 / 60) % 60),
    seconds: Math.floor((state.difference / 1000) % 60),
    reset: () => {
      timeStopped.current = Date.now()

      setState({
        startTime: Date.now(),
        timeGone: 0,
        difference: 0,
      })
    },
  }
}

export const getCardSpacing = () => {
  const card = document.querySelector('.card')
  const cardWidth = card
    ? card.clientWidth
    : document.documentElement.clientWidth / 6
  const xBuffer = (document.documentElement.clientWidth - cardWidth * 6) / 7
  const width = cardWidth + xBuffer

  let height = Math.min(38, Math.max(window.innerHeight / 16, 25))
  let yBuffer = height * 2

  if (document.documentElement.clientWidth > 1000) {
    height = Math.min(50, Math.max(window.innerHeight / 16, 25))
    yBuffer = height * 3
  }

  return { width, height, yBuffer, xBuffer }
}

export const getCardPosition = card => {
  const { width, height, yBuffer, xBuffer } = getCardSpacing()

  const x = xBuffer + card.pileIndex * width
  const y = card.isEmpty
    ? yBuffer
    : yBuffer + (card.isFinished ? 0 : card.cardPileIndex * height)

  return { x, y }
}
