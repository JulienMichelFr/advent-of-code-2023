import { readData } from '../../shared.ts';
import chalk from 'chalk';

class Race {
  constructor(
    public readonly time: number,
    public readonly distance: number,
  ) {}

  getSolution(): number {
    const solutions: number[] = [];
    for (let i = 0; i <= this.time; i++) {
      const run = i * (this.time - i);
      if (run > this.distance) {
        solutions.push(run);
      }
    }
    return solutions.length;
  }
}

function getRaces(rows: string[]): Race[] {
  const [times, distances] = rows
    .filter((v) => v !== '')
    .map((row) =>
      row
        .split(':')[1]
        .replace(/\s*/, ' ')
        .replace('\r', '')
        .split(' ')
        .filter((v) => v !== '')
        .map((value) => parseInt(value, 10)),
    );

  return times.map((time, index) => new Race(time, distances[index]));
}

export async function day6a(dataPath?: string) {
  const data = await readData(dataPath, false);
  const races: Race[] = getRaces(data);
  return races.reduce((acc, race) => acc * race.getSolution(), 1);
}

const answer = await day6a();
console.log(chalk.bgGreen('Your Answer:'), chalk.green(answer));
