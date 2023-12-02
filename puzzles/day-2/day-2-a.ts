import {readData} from '../../shared.ts';
import chalk from 'chalk';

const RED_MAX = 12;
const GREEN_MAX = 13;
const BLUE_MAX = 14;

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
    const someGamesAreInvalid: boolean = parsed.games.some((game) => !gameIsValid(game))
    if (someGamesAreInvalid) {
      return acc
    }

    return acc + parsed.id

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

function gameIsValid(game: Game): boolean {
  return game.red <= RED_MAX && game.blue <= BLUE_MAX && game.green <= GREEN_MAX;
}

const answer = await day2a();
console.log(chalk.bgGreen('Your Answer:'), chalk.green(answer));


