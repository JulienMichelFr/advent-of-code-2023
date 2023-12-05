import { readFile } from 'fs/promises';

export async function readData(path?: string, raw?: true): Promise<string>;
export async function readData(path?: string, raw?: false): Promise<string[]>;
export async function readData(
  path?: string,
  raw?: boolean,
): Promise<string | string[]>;
export async function readData(
  path?: string,
  raw = false,
): Promise<string | string[]> {
  const fileName = path || process.argv[2];
  const data = (await readFile(fileName)).toString();
  if (raw) {
    return data;
  }
  return data.split('\n');
}
