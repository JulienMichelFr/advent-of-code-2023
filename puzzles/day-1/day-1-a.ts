import { readData } from '../../shared.ts';
import chalk from 'chalk';

export async function day1a(dataPath?: string) {
  const data = await readData(dataPath);

  return data.reduce((acc, row) => {
    const numbers = (row.match(/\d/igm) ?? [])
    if (!numbers.length) {
      return acc
    }
    const first = numbers[0]
    const last = numbers[numbers.length - 1];
    console.log({first,last});
    return acc + parseInt(`${first}${last}`);
  }, 0)
}

const answer = await day1a();
console.log(chalk.bgGreen('Your Answer:'), chalk.green(answer));
