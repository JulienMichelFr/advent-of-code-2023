import {readData} from '../../shared.ts';
import chalk from 'chalk';

type NumberString = `${1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9}`;
type Values = NumberString | 'one' | 'two' | 'three' | 'four' | 'five' | 'six' | 'seven' | 'eight' | 'nine'

export async function day1b(dataPath?: string) {
  const data = await readData(dataPath);

  return data.reduce((acc, row, index) => {
    //const numbers = row.match) as Values[];
    const numbers = matchOverlap(row, /\d|one|two|three|four|five|six|seven|eight|nine/)
    if (!numbers?.length) {
      return acc
    }
    const first: NumberString = valueToNumberString(numbers[0])
    const last: NumberString = valueToNumberString(numbers[numbers.length - 1]);
    const parsed = parseInt(`${first}${last}`);
    if (index === 3) {
      console.table({index, first, last, numbers: numbers.toString(), parsed, acc, row});
    }
    return acc + parsed;
  }, 0)
}

function valueToNumberString(value: Values): NumberString {
  switch (value) {
    case "one":
      return '1'
    case "two":
      return '2'
    case "three":
      return '3'
    case "four":
      return '4'
    case "five":
      return '5';
    case "six":
      return '6'
    case "seven":
      return '7'
    case "eight":
      return '8'
    case "nine":
      return '9'
    default:
      return value;
  }
}

// https://stackoverflow.com/a/20835462
function matchOverlap(input: string, re: RegExp): Values[] {
  let r: Values[] = [];
  let m: Values[];
  // Prevent infinite loops
  if (!re.global) re = new RegExp(
    re.source, (re + '').split('/').pop() + 'g'
  );
  while (m = re.exec(input) as Values[]) {
    re.lastIndex -= m[0].length - 1;
    r.push(m[0]);
  }
  return r;
}

const answer = await day1b();
console.log(chalk.bgGreen('Your Answer:'), chalk.green(answer));
