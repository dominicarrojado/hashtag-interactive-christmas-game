import faker from 'faker';

type GetFakeNumber = {
  (max?: number): number;
  (options?: { min?: number; max?: number; precision?: number }): number;
};

export function setReadOnlyProperty<
  O extends Record<string, any>,
  K extends keyof O,
  V extends any
>(object: O, property: K, value: V) {
  Object.defineProperty(object, property, {
    value,
    configurable: true,
  });
}

export function getFakeNumber<T = GetFakeNumber>(data?: T) {
  return faker.datatype.number(data);
}

export function getFakeBoolean() {
  return faker.datatype.boolean();
}

export function getFakeString() {
  return faker.datatype.string();
}

export function getFakeWord() {
  return faker.lorem.word();
}

export function getFakeSentence() {
  return faker.lorem.sentence();
}

export function getFakeSentences() {
  return faker.lorem.sentences();
}

export function getFakeDirectoryPath() {
  return faker.system.directoryPath();
}
