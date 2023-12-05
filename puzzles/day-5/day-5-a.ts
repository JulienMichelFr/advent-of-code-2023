import { readData } from '../../shared.ts';
import chalk from 'chalk';

type Range = { start: number; end: number };

type Maps = {
  seedToSoilMap: Resolver;
  soilToFertilizerMap: Resolver;
  fertilizerToWaterMap: Resolver;
  waterToLightMap: Resolver;
  lightToTemperatureMap: Resolver;
  temperatureToHumidityMap: Resolver;
  humidityToLocationMap: Resolver;
};

class Mapper {
  private readonly source: Range;
  private readonly destination: Range;

  constructor(destination: number, source: number, size: number) {
    this.source = {
      start: source,
      end: source + size,
    };
    this.destination = {
      start: destination,
      end: destination + size,
    };
  }

  includeValue(value: number): boolean {
    return this.source.start <= value && value <= this.source.end;
  }

  toDestination(value: number): number {
    const diff = Math.abs(value - this.source.start);
    return this.destination.start + diff;
  }
}

class Resolver {
  constructor(private readonly mappers: Mapper[]) {}

  getResult(value: number): number {
    const found = this.mappers.find((mapper) => mapper.includeValue(value));
    return found?.toDestination(value) ?? value;
  }
}

function getLocationForSeed(seed: number, maps: Maps): number {
  const soil = maps.seedToSoilMap.getResult(seed);
  const fertilizer = maps.soilToFertilizerMap.getResult(soil);
  const water = maps.fertilizerToWaterMap.getResult(fertilizer);
  const light = maps.waterToLightMap.getResult(water);
  const temperature = maps.lightToTemperatureMap.getResult(light);
  const humidity = maps.temperatureToHumidityMap.getResult(temperature);
  return maps.humidityToLocationMap.getResult(humidity);
}

function toMapper(row: string): Mapper {
  const [destination, source, size] = row
    .split(' ')
    .map((v) => parseInt(v, 10));
  return new Mapper(destination, source, size);
}

export async function day5a(dataPath?: string) {
  const data = await readData(dataPath, true);
  const [
    seeds,
    seedToSoil,
    soilToFertilizer,
    fertilizerToWater,
    waterToLight,
    lightToTemperature,
    temperatureToHumidity,
    humidityToLocation,
  ] = data.split('\r\n\r\n').map((block) =>
    block
      .split(':')[1]
      .split('\r\n')
      .filter((v) => v !== '')
      .map((v) => v.trim()),
  );
  const maps: Maps = {
    seedToSoilMap: new Resolver(seedToSoil.map(toMapper)),
    soilToFertilizerMap: new Resolver(soilToFertilizer.map(toMapper)),
    fertilizerToWaterMap: new Resolver(fertilizerToWater.map(toMapper)),
    waterToLightMap: new Resolver(waterToLight.map(toMapper)),
    lightToTemperatureMap: new Resolver(lightToTemperature.map(toMapper)),
    temperatureToHumidityMap: new Resolver(temperatureToHumidity.map(toMapper)),
    humidityToLocationMap: new Resolver(humidityToLocation.map(toMapper)),
  };

  const seedList = seeds[0].split(' ').map((v) => parseInt(v, 10));

  return seedList.reduce((acc, seed) => {
    const location = getLocationForSeed(seed, maps);
    if (location < acc) {
      return location;
    }
    return acc;
  }, +Infinity);
}

const answer = await day5a();
console.log(chalk.bgGreen('Your Answer:'), chalk.green(answer));
