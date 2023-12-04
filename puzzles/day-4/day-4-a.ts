import {readData} from '../../shared.ts';
import chalk from 'chalk';

function getScore(numbers: number[]): number {
  return numbers.length > 0 ? Math.pow(2, numbers.length - 1) : 0;
}

export async function day4a(dataPath?: string) {
  const data = await readData(dataPath)

  return data.reduce((acc, row) => {
    if (!row?.length) {
      return acc;
    }
    const [winningNumbers, numbers] = row.split(':')[1]
      .split('|')
      .map((value) => value.replace(/\r/, '')
        .split(' ')
        .filter(v => v !== '')
        .map((value) => parseInt(value, 10)))
    const foundNumbers: number[] = numbers.reduce((acc, number) => {
      if (winningNumbers.includes(number)) {
        acc.push(number)
      }
      return acc;
    }, [])
    console.table({
      winningNumbers,
      numbers,
      foundNumbers, score: getScore(foundNumbers)
    });

    return acc + getScore(foundNumbers);
  }, 0);
}

const answer = await day4a();
console.log(chalk.bgGreen('Your Answer:'), chalk.green(answer));
