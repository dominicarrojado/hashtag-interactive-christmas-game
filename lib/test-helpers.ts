import faker from 'faker';

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
