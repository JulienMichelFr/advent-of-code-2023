import { readData } from '../../shared.ts';
import chalk from 'chalk';

type Card = 'A' | 'K' | 'Q' | 'J' | 'T' | '9' | '8' | '7' | '6' | '5' | '4' | '3' | '2';

type Cards = [Card, Card, Card, Card, Card];

enum HandType {
  'HighCard',
  'OnePair',
  'TwoPair',
  'ThreeOfAKind',
  'FullHouse',
  'FourOfAKind',
  'FiveOfAKind'
}

function getCardScore(card: Card): number {
  switch (card) {
    case "A":
      return 14
    case "K":
      return 13
    case "Q":
      return 12
    case "J":
      return 11
    case "T":
      return 10
    default:
      return parseInt(card, 10)

  }
}

function compareHands(a: Hand, b: Hand): -1 | 1 {
  if (a.type === b.type) {
    for (let i = 0; i < 5; i++) {
      if (getCardScore(a.cards[i]) > getCardScore(b.cards[i])) {
        return 1
      } else if (getCardScore(b.cards[i]) > getCardScore(a.cards[i])) {
        return -1
      }
    }
  }
  if (a.type > b.type) {
    return 1
  }
  return -1
}

class Hand {
  public type: HandType

  constructor(public readonly cards: Cards, public readonly bid: number) {
    this.type = this.getType();
  }

  private getType(): HandType {
    const groups: Partial<Record<Card, number>> = this.groupCards();
    const keys = Object.keys(groups);
    const values = Object.values(groups);
    console.groupCollapsed('File: day-7-a.ts, Function getType Line : 63')
    console.log(this.cards, keys)
    console.groupEnd()

    switch (keys.length) {
      case 5:
        return HandType.HighCard;
      case 4:
        return HandType.OnePair;
      case 3:
        if (values.some(v => v === 3)) {
          return HandType.ThreeOfAKind
        }
        return HandType.TwoPair
      case 2:
        if (values.some(v => v === 4)) {
          return HandType.FourOfAKind
        }
        return HandType.FullHouse
      case 1:
        return HandType.FiveOfAKind
    }
  }

  private groupCards(): Partial<Record<Card, number>> {
    return this.cards.reduce((acc, card) => {
      if (!acc[card]) {
        acc[card] = 1
      } else {
        acc[card]++;
      }
      return acc;
    }, {})
  }
}


export async function day7a(dataPath?: string) {
  const data = (await readData(dataPath, false)).filter((v) => v !== '');
  const hands: Hand[] = data.map((value) => {
    const [hand, bidString] = value.split(' ');
    return new Hand(hand.split('') as Cards, parseInt(bidString, 10))
  })
  const sorted = hands.sort((a, b) => compareHands(a, b))
  console.log(sorted.filter((hand) => hand.type === 6));
  return sorted.reduce((acc, hand, index) => {
    return acc + hand.bid * (index + 1)
  }, 0)

}

const answer = await day7a();
console.log(chalk.bgGreen('Your Answer:'), chalk.green(answer));
