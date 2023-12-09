import { readData } from '../../shared.ts';
import chalk from 'chalk';

function isEnd(values: number[]): boolean {
  return values.every(value => value === 0);
}

function getNextGeneration(values: number[]): number[] {
  return values.reduce((acc: number[], value, index) => {
    const next = values[index + 1];
    if (next === undefined) {
      return acc;
    }
    acc.push(next - value)
    return acc;
  }, [])
}

function doLine(values: number[]): number {
  const generations: number[][] = [values];
  while (!isEnd(generations.at(-1))) {
    const last = generations.at(-1);
    generations.push(getNextGeneration(last))
  }
  return [...generations.reverse()].reduce((acc, generation) => {
    return acc + generation.at(-1);
  }, 0);
}

export async function day9a(dataPath?: string) {
  const data = (await readData(dataPath, false)).filter(v => v !== '').map((value) => value.replace('\r', '').split(' ').map((v) => parseInt(v, 10)));
  return data.reduce((acc, line) => {
    return acc + doLine(line);
  }, 0)
}

const answer = await day9a();
console.log(chalk.bgGreen('Your Answer:'), chalk.green(answer));
