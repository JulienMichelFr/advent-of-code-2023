import {readData} from '../../shared.ts';
import chalk from 'chalk';

type Color = 'red' | 'blue' | 'green';
type Game = Record<Color, number>;
type Row = { id: number; games: Game[] }

export async function day2a(dataPath?: string) {
  const data = await readData(dataPath);
  return data.reduce((acc, row) => {
    if (!row?.length) {
      return acc
    }
    const parsed = parseRow(row);
    const minValues: Game = parsed.games.reduce((acc, game: Game) => {
      if (game.red > acc.red) {
        acc.red = game.red;
      }
      if (game.blue > acc.blue) {
        acc.blue = game.blue;
      }
      if (game.green > acc.green) {
        acc.green = game.green;
      }
      return acc;
    }, {blue: 0, red: 0, green: 0} satisfies Game)

    return acc + (minValues.red * minValues.green * minValues.blue)

  }, 0)
}

function parseRow(row: string): Row {
  return {
    id: extractGameId(row),
    games: extractGames(row)
  }
}

function extractGameId(row: string): number {
  const value = row.match(/Game\s(\d*):/)
  return parseInt(value[1]);
}

function extractGames(row: string): Game[] {
  const gamesString = row.split(':')[1].split(';');
  return gamesString.reduce((acc, game) => {
    acc.push(extractGame(game))
    return acc;
  }, [])
}

function extractGame(value: string): Game {
  return {
    blue: extractColor(value, 'blue'),
    green: extractColor(value, 'green'),
    red: extractColor(value, 'red')
  }
}


function extractColor(value: string, color: Color): number {
  return value.split(',').find((s) => s.includes(color))?.match(/\d+/g)?.map(Number)[0] ?? 0
}

const answer = await day2a();
console.log(chalk.bgGreen('Your Answer:'), chalk.green(answer));


