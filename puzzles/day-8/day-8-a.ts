import { readData } from '../../shared.ts';
import chalk from 'chalk';

type Direction = 'L' | 'R';
type Point = string;

type Path = Record<Direction, Point>;
type Origins = Map<Point, Path>;

function extractPoint(value: string): Point {
  return value.replace(' ', '').split('=')[0];
}

function extractLeftRight(value: string): Path {
  const [L, R] = value
    .match(/\((.*)\)/gi)[0]
    .replace('(', '')
    .replace(')', '')
    .replace(' ', '')
    .split(',');

  return { L, R };
}

export async function day8a(dataPath?: string) {
  const data = (await readData(dataPath, false))
    .map((v) => v.replace('\r', ''))
    .filter((v) => v !== '');
  const [directionString, ...rest] = data;
  const direction: Direction[] = directionString.split('') as Direction[];
  const origins: Origins = new Map<Point, Path>(
    rest.map((value) => [extractPoint(value), extractLeftRight(value)]),
  );

  let currentDirectionIndex = 0;
  let currentPoint: Point = 'AAA';

  const path: Point[] = [currentPoint];
  const lastPoint: Point = 'ZZZ';

  while (currentPoint !== lastPoint) {
    currentPoint = origins.get(currentPoint)[direction[currentDirectionIndex]];
    path.push(currentPoint);
    if (currentDirectionIndex === direction.length - 1) {
      currentDirectionIndex = 0;
    } else {
      currentDirectionIndex++;
    }
  }

  return path.length - 1;
}

const answer = await day8a();
console.log(chalk.bgGreen('Your Answer:'), chalk.green(answer));
