import {readData} from '../../shared.ts';
import chalk from 'chalk';

export async function day3a(dataPath?: string) {
  const data = await readData(dataPath);
  return data.reduce((acc, row, index) => {
    const previousRow = data[index - 1];

    const nextRow = data[index + 1];

    const numbers = [...row.matchAll(/\d*/g)];
    return acc + numbers.reduce((nestedAcc: number, match) => {
      if (/\d/.test(match[0])) {
        let startIndex = match.index;
        const lastIndex = match.index + match[0].length - 1;
        while (startIndex <= lastIndex) {
          if (hasAdjacentSymbol(row, startIndex, previousRow, nextRow)) {
            return nestedAcc + parseInt(match[0])
          }
          startIndex++;
        }
      }
      return nestedAcc
    }, 0);


  }, 0);
}

function hasAdjacentSymbol(row: string, index: number, previous: string | undefined, next: string | undefined): boolean {
  const topLeft = previous?.[index - 1];
  const top = previous?.[index]
  const topRight = previous?.[index + 1];
  const left = row[index - 1];
  const right = row[index + 1];
  const bottomLeft = next[index - 1];
  const bottom = next[index];
  const bottomRight = next[index + 1];

  return [
    topLeft,
    top,
    topRight,
    left,
    right,
    bottomLeft,
    bottom,
    bottomRight
  ].filter(v => ![null, undefined].includes(v)).some((value) => isSymbol(value));
}

function isSymbol(value: string): boolean {
  return /[^\d|\r|.]/.test(value);
}

const answer = await day3a();
console.log(chalk.bgGreen('Your Answer:'), chalk.green(answer));
